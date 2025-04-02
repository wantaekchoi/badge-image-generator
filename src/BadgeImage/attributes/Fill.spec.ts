import { Fill } from "./Fill";
import { FillType, DirectionType, TextureType } from "../constants";

describe(Fill.name, () => {
  const type = "fill";
  describe("toJson 메서드", () => {
    it("FillType.NONE일 때 올바른 JSON 반환", () => {
      const fill = Fill.none();
      expect(fill.toJson()).toStrictEqual({
        type,
        fill: FillType.NONE,
      });
    });

    it("FillType.SOLID일 때 hexColor 포함된 JSON 반환", () => {
      const fill = Fill.HexColor("#FF5733");
      expect(fill.toJson()).toStrictEqual({
        type,
        fill: FillType.SOLID,
        hexColor: "#FF5733",
      });
    });

    it("FillType.GRADIENT일 때 gradientColor와 gradientDirection 포함된 JSON 반환", () => {
      const gradientColor = { start: "#FF5733", end: "#33FF57" };
      const fill = Fill.GradientColor(
        gradientColor,
        DirectionType.DIAGONAL_RIGHT
      );
      expect(fill.toJson()).toStrictEqual({
        type,
        fill: FillType.GRADIENT,
        gradientColor,
        gradientDirection: DirectionType.DIAGONAL_RIGHT,
      });
    });

    it("FillType.PATTERN일 때 patternColor 포함된 JSON 반환", () => {
      const patternColor = { mainColor: "#FF5733", backgroundColor: "#FFFFFF" };
      const fill = Fill.PatternColor(patternColor);
      expect(fill.toJson()).toStrictEqual({
        type,
        fill: FillType.PATTERN,
        patternColor,
      });
    });

    it("FillType.TEXTURE일 때 texture 포함된 JSON 반환", () => {
      const texture = TextureType.WOOD;
      const fill = Fill.Texture(texture);
      expect(fill.toJson()).toStrictEqual({
        type,
        fill: FillType.TEXTURE,
        texture,
      });
    });
  });

  describe("정적 팩토리 메서드", () => {
    it("none() 메서드가 FillType.NONE을 생성", () => {
      const fill = Fill.none();
      expect(fill.toJson().type).toBe("fill");
      expect(fill.toJson().fill).toBe(FillType.NONE);
    });

    it("HexColor() 메서드가 FillType.SOLID을 생성하고 hexColor를 설정", () => {
      const hexColor = "#FF5733";
      const fill = Fill.HexColor(hexColor);
      expect(fill.toJson().type).toBe("fill");
      expect(fill.toJson().fill).toBe(FillType.SOLID);
      expect(fill.toJson().hexColor).toBe(hexColor);
    });

    it("GradientColor() 메서드가 FillType.GRADIENT을 생성하고 gradientColor와 gradientDirection을 설정", () => {
      const gradientColor = { start: "#FF5733", end: "#33FF57" };
      const gradientDirection = DirectionType.RADIAL;
      const fill = Fill.GradientColor(gradientColor, gradientDirection);
      expect(fill.toJson().type).toBe("fill");
      expect(fill.toJson().fill).toBe(FillType.GRADIENT);
      expect(fill.toJson().gradientColor).toStrictEqual(gradientColor);
      expect(fill.toJson().gradientDirection).toBe(gradientDirection);
    });

    it("PatternColor() 메서드가 FillType.PATTERN을 생성하고 patternColor를 설정", () => {
      const patternColor = { mainColor: "#FF5733", backgroundColor: "#FFFFFF" };
      const fill = Fill.PatternColor(patternColor);
      expect(fill.toJson().type).toBe("fill");
      expect(fill.toJson().fill).toBe(FillType.PATTERN);
      expect(fill.toJson().patternColor).toStrictEqual(patternColor);
    });

    it("Texture() 메서드가 FillType.TEXTURE을 생성하고 texture를 설정", () => {
      const texture = TextureType.METAL;
      const fill = Fill.Texture(texture);
      expect(fill.toJson().type).toBe("fill");
      expect(fill.toJson().fill).toBe(FillType.TEXTURE);
      expect(fill.toJson().texture).toBe(texture);
    });
  });
});
