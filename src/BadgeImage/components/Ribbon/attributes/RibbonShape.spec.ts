import { RibbonType } from "../../../constants";
import {
  CurvatureType,
  EndStyleType,
  TwistType,
  WidthVariationType,
} from "./constants";
import { RibbonShape } from "./RibbonShape";

describe("RibbonShape 클래스", () => {
  const type = "shape";
  describe("생성자 유효성 검사", () => {
    it("ribbonLayers가 1보다 작으면 에러 발생", () => {
      expect(() => RibbonShape.straight({ ribbonLayers: 0 })).toThrowError(
        "Invalid ribbonLayers value: 0, min: 1"
      );
    });

    it("ribbonLayers가 1 이상이면 정상 생성", () => {
      const option = { ribbonLayers: 1 };
      const shape = RibbonShape.straight(option);
      expect(shape.toJson()).toEqual({
        type,
        shape: RibbonType.STRAIGHT,
        ribbonLayers: 1,
      });
    });
  });

  describe("팩토리 메서드 테스트", () => {
    const testCases = [
      ["straight", RibbonType.STRAIGHT],
      ["curved", RibbonType.CURVED],
      ["wavy", RibbonType.WAVY],
      ["folded", RibbonType.FOLDED],
      ["banner", RibbonType.BANNER],
      ["diagonal", RibbonType.DIAGONAL],
      ["badgeWrap", RibbonType.BADGE_WRAP],
      ["doubleLayered", RibbonType.DOUBLE_LAYERED],
      ["circular", RibbonType.CIRCULAR],
    ];

    it.each(testCases)(
      "%s()는 %s 타입의 리본을 생성한다",
      (methodName, expectedType) => {
        // Arrange & Act
        const shape = (
          RibbonShape[
            methodName as keyof typeof RibbonShape
          ] as () => RibbonShape
        )();

        // Assert
        expect(shape.toJson()).toEqual({
          type,
          shape: expectedType,
        });
      }
    );
  });

  describe("toJson() 메서드 테스트", () => {
    it("옵션 없이 생성된 리본의 JSON 출력 확인", () => {
      // Arrange & Act
      const shape = RibbonShape.straight();

      // Assert
      expect(shape.toJson()).toEqual({
        type,
        shape: RibbonType.STRAIGHT,
      });
    });

    it("옵션이 포함된 리본의 JSON 출력 확인", () => {
      // Arrange
      const option = {
        endStyle: EndStyleType.ANGLED,
        curvature: CurvatureType.HIGH,
        twist: TwistType.DOUBLE,
        widthVariation: WidthVariationType.TAPERED,
        ribbonLayers: 2,
      };

      // Act
      const shape = RibbonShape.curved(option);

      // Assert
      expect(shape.toJson()).toEqual({
        type,
        shape: RibbonType.CURVED,
        ...option,
      });
    });

    it.each([
      ["endStyle", "forked"],
      ["curvature", "high"],
      ["twist", "double"],
      ["widthVariation", "tapered"],
      ["ribbonLayers", 2],
    ])("%s 옵션이 포함된 경우 JSON 출력 확인", (key, value) => {
      // Arrange
      const option = { [key]: value };

      // Act
      const shape = RibbonShape.wavy(option);

      // Assert
      expect(shape.toJson()).toEqual({
        type,
        shape: RibbonType.WAVY,
        [key]: value,
      });
    });
  });
});
