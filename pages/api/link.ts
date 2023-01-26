import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import url from "node:url";

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
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw LinkError.ShortcodeExists;
      }
    }
  } finally {
    await prisma.$disconnect();
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: LinkError.InvalidMethod });
  }

  const body = req.body as {
    url?: string;
    shortcode?: string;
  };

  if (!body.url) {
    return res.status(400).json({ error: LinkError.Empty });
  }

  if (!body.url.startsWith("http://") && !body.url.startsWith("https://")) {
    return res.status(400).json({ error: LinkError.InvalidUrl });
  }

  if (url.domainToUnicode(new URL(body.url).hostname) !== "הנטאי.ישראל") {
    return res.status(400).json({ error: LinkError.DisallowedDomain });
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
            return res.status(409).json({ error: e });
          }

          if (tries === MAX_TRIES_TO_GENERATE_SHORTCODE) {
            return res
              .status(500)
              .json({ error: LinkError.CouldntGenerateShortcode });
          }
        }
      }
    }
  }

  // @ts-ignore
  return res.status(200).json({ url: `הנטאי.ישראל/${shortcode}` });
}
