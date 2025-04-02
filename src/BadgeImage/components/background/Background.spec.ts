import { Background } from "./Background";
import { JsonSerializable } from "../../JsonSerializable";

class SimpleFill implements JsonSerializable {
  toJson() {
    return { type: "fill", color: "#FFFFFF" };
  }
}

class ComplexFill implements JsonSerializable {
  toJson() {
    return {
      type: "fill",
      gradient: { start: "#000000", end: "#333333" },
      pattern: "striped",
    };
  }
}

describe("Background 클래스", () => {
  const type = "background";
  describe("fill() 팩토리 메서드", () => {
    it("Fill 객체를 포함한 Background 인스턴스 생성", () => {
      const mockFill = new SimpleFill();
      const background = Background.withFill(mockFill);
      expect(background).toBeInstanceOf(Background);
    });
  });

  describe("toJson() 메서드", () => {
    it("기본 JSON 구조 반환", () => {
      const mockFill = new SimpleFill();
      const background = Background.withFill(mockFill);
      expect(background.toJson()).toStrictEqual({
        type,
        fill: mockFill.toJson(),
      });
    });

    it("복잡한 Fill 객체 처리", () => {
      const complexFill = new ComplexFill();
      const background = Background.withFill(complexFill);
      expect(background.toJson()).toStrictEqual({
        type,
        fill: complexFill.toJson(),
      });
    });
  });
});
