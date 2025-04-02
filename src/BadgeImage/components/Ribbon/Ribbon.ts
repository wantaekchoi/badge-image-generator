import { JsonSerializable } from "../../JsonSerializable";
import { JsonType } from "../../JsonType";
import { RibbonProperties } from "./RibbonProperties";

export class Ribbon implements JsonSerializable {
  private static readonly LABEL = "ribbon";
  private constructor(private readonly elements: RibbonProperties) {}

  public toJson(): {
    [Ribbon.LABEL]: JsonType;
  } {
    const describe: JsonType = { type: Ribbon.LABEL };
    Object.entries(this.elements).forEach(([key, value]) => {
      if (value) {
        describe[key] = value.toJson();
      }
    });
    return { [Ribbon.LABEL]: describe };
  }

  public static withElements(elements: RibbonProperties): Ribbon {
    return new Ribbon(elements);
  }
}
