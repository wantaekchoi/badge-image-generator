import { Badge } from "./Badge";
import { JsonSerializable } from "../../JsonSerializable";

class MockShape implements JsonSerializable {
  toJson() {
    return { type: "shape", shape: { type: "circle" } };
  }
}

class MockFill implements JsonSerializable {
  toJson() {
    return { type: "fill", fill: { color: "#FF5733" } };
  }
}

class MockSize implements JsonSerializable {
  toJson() {
    return { type: "size", size: { type: "large" } };
  }
}

describe("Badge 클래스", () => {
  const type = "badge";

  describe("toJson() 메서드", () => {
    it("빈 elements로 생성된 배지 객체의 JSON 출력 확인", () => {
      const badge = Badge.withProperties({ title: "Test Badge" });
      expect(badge.toJson()).toStrictEqual({
        type,
        title: "Test Badge",
      });
    });

    it("shape가 포함된 배지 객체의 JSON 출력 확인", () => {
      const shape = new MockShape();
      const badge = Badge.withProperties({ title: "Shape Badge", shape });
      expect(badge.toJson()).toStrictEqual({
        type,
        title: "Shape Badge",
        shape: shape.toJson(),
      });
    });

    it("fill이 포함된 배지 객체의 JSON 출력 확인", () => {
      const fill = new MockFill();
      const badge = Badge.withProperties({ title: "Fill Badge", fill });
      expect(badge.toJson()).toStrictEqual({
        type,
        title: "Fill Badge",
        fill: fill.toJson(),
      });
    });

    it("size가 포함된 배지 객체의 JSON 출력 확인", () => {
      const size = new MockSize();
      const badge = Badge.withProperties({ title: "Size Badge", size });
      expect(badge.toJson()).toStrictEqual({
        type,
        title: "Size Badge",
        size: size.toJson(),
      });
    });

    it("shape, fill, size가 모두 포함된 배지 객체의 JSON 출력 확인", () => {
      const shape = new MockShape();
      const fill = new MockFill();
      const size = new MockSize();
      const badge = Badge.withProperties({
        title: "Full Badge",
        shape,
        fill,
        size,
      });
      expect(badge.toJson()).toStrictEqual({
        type,
        title: "Full Badge",
        shape: shape.toJson(),
        fill: fill.toJson(),
        size: size.toJson(),
      });
    });
  });
});
