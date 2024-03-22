import { PrismaClient } from "@prisma/client";

import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export const runtime = "edge";

async function getTargetUrl(id: string): Promise<string | null> {
  const prisma = new PrismaClient();

  let targetUrl: string | null = null;

  try {
    const result = await prisma.url.findUnique({
      where: {
        id,
      },
    });

    targetUrl = result?.targetUrl ?? null;
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }

  return targetUrl;
}

export async function GET(
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const target = await getTargetUrl(decodeURIComponent(id));

  if (target !== null) {
    return redirect(target);
  }

  return redirect("/");
}
