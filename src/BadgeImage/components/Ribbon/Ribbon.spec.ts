import { Ribbon } from "./Ribbon";
import { JsonSerializable } from "../../JsonSerializable";

class MockShape implements JsonSerializable {
  toJson(): { shape: { type: string } } {
    return { shape: { type: "circle" } };
  }
}

class MockFill implements JsonSerializable {
  toJson(): { fill: { color: string } } {
    return { fill: { color: "#FF5733" } };
  }
}

class MockSize implements JsonSerializable {
  toJson(): { size: { type: string } } {
    return { size: { type: "large" } };
  }
}

describe(Ribbon.name, () => {
  describe("toJson() 메서드", () => {
    it("빈 elements로 생성된 배지 객체의 JSON 출력 확인", () => {
      const ribbon = Ribbon.withElements({});
      expect(ribbon.toJson()).toStrictEqual({
        ribbon: { type: "ribbon" },
      });
    });

    it("shape가 포함된 배지 객체의 JSON 출력 확인", () => {
      const shape = new MockShape();
      const ribbon = Ribbon.withElements({ shape });
      expect(ribbon.toJson()).toStrictEqual({
        ribbon: {
          type: "ribbon",
          shape: { shape: { type: "circle" } },
        },
      });
    });

    it("fill이 포함된 배지 객체의 JSON 출력 확인", () => {
      const fill = new MockFill();
      const ribbon = Ribbon.withElements({ fill });
      expect(ribbon.toJson()).toStrictEqual({
        ribbon: {
          type: "ribbon",
          fill: { fill: { color: "#FF5733" } },
        },
      });
    });

    it("size가 포함된 배지 객체의 JSON 출력 확인", () => {
      const size = new MockSize();
      const ribbon = Ribbon.withElements({ size });
      expect(ribbon.toJson()).toStrictEqual({
        ribbon: {
          type: "ribbon",
          size: { size: { type: "large" } },
        },
      });
    });

    it("shape, fill, size가 모두 포함된 배지 객체의 JSON 출력 확인", () => {
      const shape = new MockShape();
      const fill = new MockFill();
      const size = new MockSize();
      const ribbon = Ribbon.withElements({ shape, fill, size });
      expect(ribbon.toJson()).toStrictEqual({
        ribbon: {
          type: "ribbon",
          shape: { shape: { type: "circle" } },
          fill: { fill: { color: "#FF5733" } },
          size: { size: { type: "large" } },
        },
      });
    });
  });
});
