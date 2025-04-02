import { Position } from "./Position";
import { PositionType } from "../constants";

describe(Position.name, () => {
  const type = "position";
  describe("정적 팩토리 메서드", () => {
    it("TopSize()는 TOP 타입 인스턴스를 생성한다", () => {
      const position = Position.TopSize();
      expect(position.toJson()).toStrictEqual({
        type,
        position: PositionType.TOP,
      });
    });

    it("MiddleSize()는 MIDDLE 타입 인스턴스를 생성한다", () => {
      const position = Position.MiddleSize();
      expect(position.toJson()).toStrictEqual({
        type,
        position: PositionType.MIDDLE,
      });
    });

    it("BottomSize()는 BOTTOM 타입 인스턴스를 생성한다", () => {
      const position = Position.BottomSize();
      expect(position.toJson()).toStrictEqual({
        type,
        position: PositionType.BOTTOM,
      });
    });
  });

  describe("toJson() 메서드", () => {
    it.each([
      [Position.TopSize(), PositionType.TOP],
      [Position.MiddleSize(), PositionType.MIDDLE],
      [Position.BottomSize(), PositionType.BOTTOM],
    ])("%s 타입의 JSON 출력 확인", (positionInstance, expectedType) => {
      const json = positionInstance.toJson();
      expect(json).toStrictEqual({
        type,
        position: expectedType,
      });
    });
  });
});
