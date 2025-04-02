import { JsonSerializable } from "../../JsonSerializable";
import { JsonType } from "../../JsonType";

export class Background implements JsonSerializable {
  private static readonly LABEL = "background";
  private constructor(private readonly fill: JsonSerializable) {}

  public toJson() {
    const describe: JsonType = { type: Background.LABEL };
    const { fill } = this;
    if (fill) {
      describe.fill = fill.toJson();
    }
    return describe;
  }

  public static withFill(fill: JsonSerializable): Background {
    return new Background(fill);
  }
}
