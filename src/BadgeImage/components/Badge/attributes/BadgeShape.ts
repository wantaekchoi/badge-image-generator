import { ValidateNumber } from "../../../../ValidateNumber";
import { BadgeType } from "../../../constants";
import { JsonSerializable } from "../../../JsonSerializable";
import { JsonType } from "../../../JsonType";
import { ShieldShapeType, ShieldDesignType } from "./constants";
export { ShieldShapeType, ShieldDesignType };

export type PolygonSides = number;
export type GearTeeth = number;
export type ShieldShape = ShieldShapeType;
export type ShieldDesign = ShieldDesignType;

export interface BadgeShapeOption {
  polygonSides?: PolygonSides;
  gearTeeth?: GearTeeth;
  shieldShape?: ShieldShape;
  shieldDesign?: ShieldDesign;
}

export class BadgeShape implements JsonSerializable {
  public static readonly POLYGON_SIDES_MIN = 3;
  public static readonly GEAR_TEETH_MIN = 6;

  private static readonly LABEL = "shape";
  private constructor(
    private readonly shape: BadgeType,
    private readonly option?: BadgeShapeOption
  ) {
    if (option) {
      const { polygonSides, gearTeeth } = option;
      if (polygonSides !== undefined) {
        ValidateNumber.validate(polygonSides, {
          label: "polygonSides",
          isInt: true,
          min: BadgeShape.POLYGON_SIDES_MIN,
        });
      }
      if (gearTeeth !== undefined) {
        ValidateNumber.validate(gearTeeth, {
          label: "gearTeeth",
          isInt: true,
          min: BadgeShape.GEAR_TEETH_MIN,
        });
      }
    }
  }
  public toJson() {
    const { shape, option } = this;
    const json: JsonType = { type: BadgeShape.LABEL, shape };

    if (option) {
      const { polygonSides, gearTeeth, shieldShape, shieldDesign } = option;
      switch (shape) {
        case BadgeType.POLYGON:
          if (polygonSides) {
            json.polygonSides = polygonSides;
          }
          break;
        case BadgeType.GEAR:
          if (gearTeeth) {
            json.gearTeeth = gearTeeth;
          }
          break;
        case BadgeType.SHIELD:
          if (shieldShape) {
            json.shieldStyle = shieldShape;
          }
          if (shieldDesign) {
            json.shieldDesign = shieldDesign;
          }
          break;
      }
    }

    return json;
  }

  public static CircleShape(): BadgeShape {
    return new BadgeShape(BadgeType.CIRCLE);
  }

  public static PolygonShape(polygonSides?: PolygonSides): BadgeShape {
    return new BadgeShape(BadgeType.POLYGON, { polygonSides });
  }

  public static GearShape(gearTeeth?: GearTeeth): BadgeShape {
    return new BadgeShape(BadgeType.GEAR, { gearTeeth });
  }

  public static ShieldShape(shield?: {
    shieldShape?: ShieldShape;
    shieldDesign?: ShieldDesign;
  }): BadgeShape {
    return new BadgeShape(BadgeType.SHIELD, {
      shieldShape: shield?.shieldShape,
      shieldDesign: shield?.shieldDesign,
    });
  }
}
