import type { NextApiRequest, NextApiResponse } from "next";

async function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time * 1000);
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Invalid method" });
  }

  const body = req.body as {
    url?: string;
  };

  await sleep(1);

  if (!body.url) {
    return res.status(400).json({ error: "Invalid data" });
  }

  console.log(body.url);

  res.status(200).json({ url: "הנטאי.ישראל/המ3מלח234נ" });
}
