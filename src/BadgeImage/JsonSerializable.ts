import { JsonType } from "./JsonType";

export interface JsonSerializable {
  toJson(): { [key: string]: JsonType };
}
