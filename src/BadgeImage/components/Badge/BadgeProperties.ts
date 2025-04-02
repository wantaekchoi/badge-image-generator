import { JsonSerializable } from "../../JsonSerializable";

export interface BadgeProperties {
  title: string;
  shape?: JsonSerializable;
  fill?: JsonSerializable;
  size?: JsonSerializable;
}
