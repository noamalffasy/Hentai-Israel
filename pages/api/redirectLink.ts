import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const target = await getTargetUrl(decodeURIComponent(id));

  if (target) {
    return res.redirect(301, target!);
  }

  return res.redirect("/");
}
