import { BadgeImageComponents } from "./BadgeImageComponents";
import { JsonSerializable } from "./JsonSerializable";
import { JsonType } from "./JsonType";

export class BadgeImage implements JsonSerializable {
  private static readonly LABEL = "image";
  private constructor(private readonly components: BadgeImageComponents) {}

  public toJson() {
    const json: JsonType = { type: BadgeImage.LABEL };
    Object.entries(this.components).forEach(([key, value]) => {
      if (value) {
        json[key] = value.toJson();
      }
    });
    return json;
  }

  public static withComponents(components: BadgeImageComponents): BadgeImage {
    return new BadgeImage(components);
  }
}
