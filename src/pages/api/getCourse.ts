// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

import directoryTree, {
  DirectoryTree,
  DirectoryTreeCallback,
} from "directory-tree";
import { createHash } from "crypto";
import ffprobe from "ffprobe";
import ffprobeStatic from "ffprobe-static";

type Data = {};

const videoFormats = [
  ".WEBM",
  ".MPG",
  ".MP2",
  ".MPEG",
  ".MPE",
  ".MPV",
  ".OGG",
  ".MP4",
  ".M4P",
  ".M4V",
  ".AVI",
  ".WMV",
  ".MOV",
  ".QT",
  ".FLV",
  ".SWF",
];

async function getCourse(req: NextApiRequest, res: NextApiResponse) {
  const folderPath = path.join(process.cwd(), "/public/course");
  // const fileContents = await fs.readFile(folderPath, "utf8");

  const getSys = async (url: string) =>
    ffprobe(url, {
      path: ffprobeStatic.path,
    }).then((info) => info.streams[0]);

  const callback: DirectoryTreeCallback = async (
    item: DirectoryTree,
    path: string
  ) => {
    item.path = path.match(/(?=course).*$/)?.toString() || path;
    item.name = item.name.replace(/\.[^.]*$/, "");
    item.custom = {
      id: createHash("sha1").update(path).digest("base64"),
      count: item.name.match(/^[^\d]*(\d+)/),
      rawPath: path,
    };
  };

  const dirTree: DirectoryTree & { path?: string } = directoryTree(
    folderPath,
    {
      attributes: ["extension", "type"],
      depth: 2,
      normalizePath: true,
    },
    callback,
    callback
  );

  const dirTreeWithSys = async () => {
    const children = dirTree.children;

    const getDuration = async (item: any, mapChildren?: any[]) => {
      const isVideo = videoFormats.includes(item.extension?.toUpperCase());
      const url = item.custom.rawPath;

      if (isVideo) {
        const sys = await getSys(url);
        return parseFloat(sys.duration);
      }

      if (item.type === "directory" && mapChildren)
        return mapChildren
          .filter((child) => child.type === "file" && child.custom.duration)
          .map((child) => parseFloat(child.custom.duration))
          .reduce((prevValue, currValue) => prevValue + currValue, 0);

      return;
    };

    const mapChildren = await Promise.all(
      children.map(async (child) => {
        const sys = await getDuration(child);
        const grandChildren = child.children;

        if (grandChildren) {
          const mapGrandChildren = await Promise.all(
            grandChildren.map(async (grandChild) => {
              const sys = await getDuration(grandChild);
              return {
                ...grandChild,
                custom: {
                  ...grandChild.custom,
                  duration: sys,
                },
              };
            })
          );

          const sys = await getDuration(child, mapGrandChildren);

          return {
            ...child,
            children: mapGrandChildren,
            custom: {
              ...child.custom,
              duration: sys,
            },
          };
        }

        return {
          ...child,
          custom: {
            ...child.custom,
            duration: sys,
          },
        };
      })
    );

    const sys = await getDuration(dirTree, mapChildren);

    return {
      ...dirTree,
      children: mapChildren,
      custom: {
        ...dirTree.custom,
        duration: sys,
      },
    };
  };

  const tree = await dirTreeWithSys();

  res.status(200).json(tree);
}

export default getCourse;
