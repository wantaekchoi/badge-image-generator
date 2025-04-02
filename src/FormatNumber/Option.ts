import { FormatPartProcessor } from "./FormatPartProcessor";

export interface Option {
  units: Array<string>;
  bigUnits: Array<string>;
  join: string;
  digits: Array<string>;
  omitLeadingOne: boolean;
  groupSize: number;
  processor: (part: number, option: Option) => string;
}
