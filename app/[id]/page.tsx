import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

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

export default async function Short({
  params: { id },
}: {
  params: { id: string };
}) {
  const target = await getTargetUrl(id);

  if (target) {
    redirect(target!);
  }

  redirect("/");
}
