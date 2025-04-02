import { Option } from "./Option";

export interface FormatPartProcessor {
  process(part: number, option: Option): string;
}
