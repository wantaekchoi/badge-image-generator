import { RibbonType } from "../../../constants";
import { JsonSerializable } from "../../../JsonSerializable";
import { JsonType } from "../../../JsonType";
import {
  CurvatureType,
  EndStyleType,
  TwistType,
  WidthVariationType,
} from "./constants";

export type EndStyle = EndStyleType;
export type Curvature = CurvatureType;
export type Twist = TwistType;
export type WidthVariation = WidthVariationType;
export type RibbonLayers = number;

export interface RibbonShapeOption {
  endStyle?: EndStyle;
  curvature?: Curvature;
  twist?: Twist;
  widthVariation?: WidthVariation;
  ribbonLayers?: RibbonLayers;
}

export class RibbonShape implements JsonSerializable {
  private static readonly LABEL = "shape";
  private constructor(
    private readonly shape: RibbonType,
    private readonly option?: RibbonShapeOption
  ) {
    if (option) {
      const { ribbonLayers } = option;
      if (ribbonLayers !== undefined && ribbonLayers < 1) {
        throw new Error(`Invalid ribbonLayers value: ${ribbonLayers}, min: 1`);
      }
    }
  }

  public toJson() {
    const { shape, option } = this;
    const json: JsonType = { type: RibbonShape.LABEL, shape };
    if (option) {
      Object.entries(option).forEach(([key, value]) => {
        if (value) {
          json[key] = value;
        }
      });
    }
    return json;
  }

  public static straight(option?: RibbonShapeOption): RibbonShape {
    return new RibbonShape(RibbonType.STRAIGHT, option);
  }

  public static curved(option?: RibbonShapeOption): RibbonShape {
    return new RibbonShape(RibbonType.CURVED, option);
  }

  public static wavy(option?: RibbonShapeOption): RibbonShape {
    return new RibbonShape(RibbonType.WAVY, option);
  }

  public static folded(option?: RibbonShapeOption): RibbonShape {
    return new RibbonShape(RibbonType.FOLDED, option);
  }

  public static banner(option?: RibbonShapeOption): RibbonShape {
    return new RibbonShape(RibbonType.BANNER, option);
  }

  public static diagonal(option?: RibbonShapeOption): RibbonShape {
    return new RibbonShape(RibbonType.DIAGONAL, option);
  }

  public static badgeWrap(option?: RibbonShapeOption): RibbonShape {
    return new RibbonShape(RibbonType.BADGE_WRAP, option);
  }

  public static doubleLayered(option?: RibbonShapeOption): RibbonShape {
    return new RibbonShape(RibbonType.DOUBLE_LAYERED, option);
  }

  public static circular(option?: RibbonShapeOption): RibbonShape {
    return new RibbonShape(RibbonType.CIRCULAR, option);
  }
}
