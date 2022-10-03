import currExtensions from "../../contstants/curriculumExtensions.schema";
import { FileDataType } from "../types/data.types";

const curriculumType = (file: FileDataType) =>
  currExtensions.find(({ extension }) => extension === file.extension)?.type;

export default curriculumType;
