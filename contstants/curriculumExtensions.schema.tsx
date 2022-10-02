import videoFormats from "./videoFormats";

interface Extension {
  extension: string;
  type: "video" | "page";
}

const videoExtensions: Extension[] = videoFormats.map((format) => ({
  extension: format.toLowerCase(),
  type: "video",
}));

const currExtensions: Extension[] = [
  ...videoExtensions,
  {
    extension: ".md",
    type: "page",
  },
  {
    extension: ".html",
    type: "page",
  },
];

export default currExtensions;
