export type JsonType =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: JsonType }
  | Array<JsonType>;
