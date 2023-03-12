import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import url from "url";

const MAX_TRIES_TO_GENERATE_SHORTCODE = 10;

export enum LinkError {
  Empty,
  InvalidUrl,
  InvalidMethod,
  DisallowedDomain,
  ShortcodeExists,
  CouldntGenerateShortcode,
  Unknown,
}

function generateShortcode(): string {
  const ALL_CHARACTERS = "אבגדהוזחטיכלמנסעפצקרשת0123456789";
  const LENGTH = 7;

  return new Array(LENGTH)
    .fill(0)
    .map(
      () => ALL_CHARACTERS[Math.round(Math.random() * ALL_CHARACTERS.length)]
    )
    .join("");
}

async function getIdByUrl(url: string): Promise<string | null> {
  const prisma = new PrismaClient();
  let id: string | null = null;

  try {
    const target = await prisma.url.findFirst({
      where: {
        targetUrl: url,
      },
    });

    id = target?.id ?? null;
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }

  return id;
}

async function addUrl(url: string, shortcode: string): Promise<void> {
  const prisma = new PrismaClient();

  try {
    await prisma.url.create({
      data: {
        id: shortcode,
        targetUrl: url,
      },
    });
  } catch (e) {
    console.error(e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw LinkError.ShortcodeExists;
      }
    }
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  return NextResponse.json({ error: LinkError.InvalidMethod }, { status: 405 });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) satisfies {
    url?: string;
    shortcode?: string;
  };

  if (!body.url) {
    return NextResponse.json({ error: LinkError.Empty }, { status: 400 });
  }

  if (!body.url.startsWith("http://") && !body.url.startsWith("https://")) {
    return NextResponse.json({ error: LinkError.InvalidUrl }, { status: 400 });
  }

  if (url.domainToUnicode(new URL(body.url).hostname) === "הנטאי.ישראל") {
    return NextResponse.json(
      { error: LinkError.DisallowedDomain },
      { status: 400 }
    );
  }

  let didAddUrl = false;
  let shortcode: string;
  let tries = 0;

  if (!body.shortcode) {
    const existingShortcode = await getIdByUrl(body.url);

    if (!!existingShortcode) {
      shortcode = existingShortcode;
      didAddUrl = true;
    }
  }

  while (!didAddUrl) {
    shortcode = body.shortcode ?? generateShortcode();
    ++tries;

    try {
      await addUrl(body.url, shortcode);
      didAddUrl = true;
    } catch (e) {
      if (typeof e === "number") {
        if (e === LinkError.ShortcodeExists) {
          if (!!body.shortcode) {
            return NextResponse.json({ error: e }, { status: 409 });
          }

          if (tries === MAX_TRIES_TO_GENERATE_SHORTCODE) {
            return NextResponse.json(
              { error: LinkError.CouldntGenerateShortcode },
              { status: 500 }
            );
          }
        }
      }
    }
  }
  
  // @ts-ignore
  return NextResponse.json({ url: `הנטאי.ישראל/${shortcode}` });
}
