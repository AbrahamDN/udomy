export type FileDataType = {
  children?: FileDataType[];
  extension?: string;
  name: string;
  path: string;
  type: string;
  custom: {
    duration: number;
    id: string;
    rawPath: string;
  };
};

export type CourseDataType = FileDataType;
