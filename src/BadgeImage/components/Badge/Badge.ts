import { JsonSerializable } from "../../JsonSerializable";
import { JsonType } from "../../JsonType";
import { BadgeProperties } from "./BadgeProperties";

export class Badge implements JsonSerializable {
  private static readonly LABEL = "badge";
  private constructor(private readonly props: BadgeProperties) {}

  public toJson() {
    const { title, shape, fill, size } = this.props;
    const json: JsonType = { type: Badge.LABEL, title };
    if (shape) {
      json.shape = shape.toJson();
    }
    if (fill) {
      json.fill = fill.toJson();
    }
    if (size) {
      json.size = size.toJson();
    }

    return json;
  }

  public static withProperties(elements: BadgeProperties): Badge {
    return new Badge(elements);
  }
}
