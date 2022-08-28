export type CourseContentData = {
  atime: string;
  birthtime: string;
  children: CourseContentData[];
  ctime: string;
  custom: { id: string; path: string };
  extension: string;
  mtime: string;
  name: string;
  path: string;
  type: string;
};
