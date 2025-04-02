import { BadgeImage } from "./BadgeImage";
import { BadgeImageComponents } from "./BadgeImageComponents";
import { JsonSerializable } from "./JsonSerializable";

class MockBadge implements JsonSerializable {
  toJson() {
    return { badge: { type: "circle", color: "#FF5733" } };
  }
}

class MockBackground implements JsonSerializable {
  toJson() {
    return { background: { color: "#FFFFFF" } };
  }
}

class MockRibbon implements JsonSerializable {
  toJson() {
    return { ribbon: { style: "curved", text: "Winner" } };
  }
}

describe("BadgeImage 클래스", () => {
  describe("withComponents() 팩토리 메서드", () => {
    it("컴포넌트를 포함한 인스턴스 생성", () => {
      const components: BadgeImageComponents = {
        badge: new MockBadge(),
        background: new MockBackground(),
        ribbon: new MockRibbon(),
      };

      const badgeImage = BadgeImage.withComponents(components);
      expect(badgeImage).toBeInstanceOf(BadgeImage);
    });
  });

  describe("toJson() 메서드", () => {
    it("모든 컴포넌트가 포함된 JSON 출력 확인", () => {
      const components: BadgeImageComponents = {
        badge: new MockBadge(),
        background: new MockBackground(),
        ribbon: new MockRibbon(),
      };

      const result = BadgeImage.withComponents(components).toJson();

      expect(result).toEqual({
        type: "image",
        badge: { badge: { type: "circle", color: "#FF5733" } },
        background: { background: { color: "#FFFFFF" } },
        ribbon: { ribbon: { style: "curved", text: "Winner" } },
      });
    });

    it("일부 컴포넌트만 포함된 JSON 출력 확인", () => {
      const components: BadgeImageComponents = {
        badge: new MockBadge(),
        ribbon: new MockRibbon(),
      };

      const result = BadgeImage.withComponents(components).toJson();

      expect(result).toEqual({
        type: "image",
        badge: { badge: { type: "circle", color: "#FF5733" } },
        ribbon: { ribbon: { style: "curved", text: "Winner" } },
      });
      expect(result).not.toHaveProperty("background");
    });

    it("빈 컴포넌트 처리 확인", () => {
      const components: BadgeImageComponents = {};
      const result = BadgeImage.withComponents(components).toJson();

      expect(result).toEqual({ type: "image" });
    });
  });
});
