import { TextureType, FillType, DirectionType } from "../constants";
import { JsonSerializable } from "../JsonSerializable";
import { JsonType } from "../JsonType";

type HexColor = string;
type GradientColor = { start: string; end: string };
type PatternColor = { mainColor: string; backgroundColor: string };
type Texture = TextureType;

export class Fill implements JsonSerializable {
  private static readonly LABEL = "fill";
  private constructor(
    private readonly fill: FillType,
    private readonly option?: {
      hexColor?: HexColor;
      gradientColor?: GradientColor;
      gradientDirection?: DirectionType;
      patternColor?: PatternColor;
      texture?: Texture;
    }
  ) {}

  public toJson() {
    const { fill, option } = this;
    const json: JsonType = { type: Fill.LABEL, fill };
    if (option) {
      const {
        hexColor,
        gradientColor,
        gradientDirection,
        patternColor,
        texture,
      } = option;
      switch (fill) {
        case FillType.SOLID:
          if (hexColor) {
            json.hexColor = hexColor;
          }
          break;
        case FillType.GRADIENT:
          if (gradientColor) {
            json.gradientColor = gradientColor;
          }
          if (gradientDirection) {
            json.gradientDirection = gradientDirection;
          }
          break;
        case FillType.PATTERN:
          if (patternColor) {
            json.patternColor = patternColor;
          }
          break;
        case FillType.TEXTURE:
          if (texture) {
            json.texture = texture;
          }
          break;
      }
    }
    return json;
  }

  public static none(): Fill {
    return new Fill(FillType.NONE);
  }

  public static HexColor(hexColor: HexColor): Fill {
    return new Fill(FillType.SOLID, { hexColor });
  }

  public static GradientColor(
    gradientColor: GradientColor,
    gradientType?: DirectionType
  ): Fill {
    return new Fill(FillType.GRADIENT, {
      gradientColor,
      gradientDirection: gradientType,
    });
  }
  public static PatternColor(patternColor: PatternColor): Fill {
    return new Fill(FillType.PATTERN, { patternColor });
  }
  public static Texture(texture: Texture): Fill {
    return new Fill(FillType.TEXTURE, { texture });
  }
}
