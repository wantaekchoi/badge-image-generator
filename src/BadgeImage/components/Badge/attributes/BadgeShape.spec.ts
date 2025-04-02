import { BadgeType } from "../../../constants";
import { BadgeShape } from "./BadgeShape";
import { ShieldShapeType, ShieldDesignType } from "./constants";

describe(BadgeShape.name, () => {
  const type = "shape";
  describe("생성자 검증", () => {
    it(`PolygonShape에서 polygonSides가 ${BadgeShape.POLYGON_SIDES_MIN}보다 작으면 오류 발생`, () => {
      expect(() =>
        BadgeShape.PolygonShape(BadgeShape.POLYGON_SIDES_MIN - 1)
      ).toThrowError();
    });

    it(`GearShape에서 gearTeeth가 ${BadgeShape.GEAR_TEETH_MIN}보다 작으면 오류 발생`, () => {
      expect(() =>
        BadgeShape.GearShape(BadgeShape.GEAR_TEETH_MIN - 1)
      ).toThrowError();
    });
  });

  describe("toJson 메서드 검증", () => {
    it("CircleShape의 JSON 출력 확인", () => {
      const shape = BadgeShape.CircleShape();
      expect(shape.toJson()).toStrictEqual({
        type,
        shape: BadgeType.CIRCLE,
      });
    });

    it("PolygonShape의 JSON 출력 확인", () => {
      const shape = BadgeShape.PolygonShape(5);
      expect(shape.toJson()).toStrictEqual({
        type,
        shape: BadgeType.POLYGON,
        polygonSides: 5,
      });
    });

    it("GearShape의 JSON 출력 확인", () => {
      const shape = BadgeShape.GearShape(10);
      expect(shape.toJson()).toStrictEqual({
        type,
        shape: BadgeType.GEAR,
        gearTeeth: 10,
      });
    });

    it("ShieldShape의 JSON 출력 확인 (shieldShape만 포함)", () => {
      const shape = BadgeShape.ShieldShape({
        shieldShape: ShieldShapeType.ROUND,
      });
      expect(shape.toJson()).toStrictEqual({
        type,
        shape: BadgeType.SHIELD,
        shieldStyle: ShieldShapeType.ROUND,
      });
    });

    it("ShieldShape의 JSON 출력 확인 (shieldDesign만 포함)", () => {
      const shape = BadgeShape.ShieldShape({
        shieldDesign: ShieldDesignType.DIAGONAL,
      });
      expect(shape.toJson()).toStrictEqual({
        type,
        shape: BadgeType.SHIELD,
        shieldDesign: ShieldDesignType.DIAGONAL,
      });
    });

    it("ShieldShape의 JSON 출력 확인 (shieldShape와 shieldDesign 모두 포함)", () => {
      const shape = BadgeShape.ShieldShape({
        shieldShape: ShieldShapeType.ROUND,
        shieldDesign: ShieldDesignType.DIAGONAL,
      });
      expect(shape.toJson()).toStrictEqual({
        type,
        shape: BadgeType.SHIELD,
        shieldStyle: ShieldShapeType.ROUND,
        shieldDesign: ShieldDesignType.DIAGONAL,
      });
    });
  });

  describe("정적 팩토리 메서드 검증", () => {
    it("CircleShape 생성 확인", () => {
      const shape = BadgeShape.CircleShape();
      expect(shape.toJson().type).toBe(type);
      expect(shape.toJson().shape).toBe(BadgeType.CIRCLE);
    });

    it("PolygonShape 생성 확인", () => {
      const shape = BadgeShape.PolygonShape(6);
      expect(shape.toJson().type).toBe(type);
      expect(shape.toJson().shape).toBe(BadgeType.POLYGON);
      expect(shape.toJson().polygonSides).toBe(6);
    });

    it("GearShape 생성 확인", () => {
      const shape = BadgeShape.GearShape(12);
      expect(shape.toJson().type).toBe(type);
      expect(shape.toJson().shape).toBe(BadgeType.GEAR);
      expect(shape.toJson().gearTeeth).toBe(12);
    });

    it("ShieldShape 생성 확인", () => {
      const shape = BadgeShape.ShieldShape({
        shieldShape: ShieldShapeType.CLASSIC,
        shieldDesign: ShieldDesignType.DIAGONAL,
      });
      expect(shape.toJson().type).toBe(type);
      expect(shape.toJson().shape).toBe(BadgeType.SHIELD);
      expect(shape.toJson().shieldStyle).toBe(ShieldShapeType.CLASSIC);
      expect(shape.toJson().shieldDesign).toBe(ShieldDesignType.DIAGONAL);
    });
  });
});
