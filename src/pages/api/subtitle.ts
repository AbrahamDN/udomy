// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { parseSync } from "subtitle";

async function getSubtitle(req: NextApiRequest, res: NextApiResponse) {
  const folderPath = path.join(process.cwd(), "/public");

  if (req.method === "POST") {
    const file = folderPath + req.body.subtitle;
    const input = fs.readFileSync(file, "utf8");
    const subtitles = parseSync(input);

    res.status(201).json(subtitles);
  }
}

export default getSubtitle;
