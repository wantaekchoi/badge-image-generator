import { SizeType } from "../constants";
import { Size } from "./Size";

describe(Size.name, () => {
  const type = "size";
  describe("정적 팩토리 메서드", () => {
    it("FullSize()는 FULL 타입 인스턴스를 생성한다", () => {
      const size = Size.FullSize();
      expect(size.toJson()).toStrictEqual({
        type,
        size: SizeType.FULL,
      });
    });

    it("LargeSize()는 LARGE 타입 인스턴스를 생성한다", () => {
      const size = Size.LargeSize();
      expect(size.toJson()).toStrictEqual({
        type,
        size: SizeType.LARGE,
      });
    });

    it("MediumSize()는 MEDIUM 타입 인스턴스를 생성한다", () => {
      const size = Size.MediumSize();
      expect(size.toJson()).toStrictEqual({
        type,
        size: SizeType.MEDIUM,
      });
    });

    it("SmallSize()는 SMALL 타입 인스턴스를 생성한다", () => {
      const size = Size.SmallSize();
      expect(size.toJson()).toStrictEqual({
        type,
        size: SizeType.SMALL,
      });
    });
  });

  describe("toJson() 메서드", () => {
    it.each([
      [Size.FullSize(), SizeType.FULL],
      [Size.LargeSize(), SizeType.LARGE],
      [Size.MediumSize(), SizeType.MEDIUM],
      [Size.SmallSize(), SizeType.SMALL],
    ])("%s 타입의 JSON 출력 확인", (sizeInstance, expectedType) => {
      const json = sizeInstance.toJson();
      expect(json).toStrictEqual({
        type,
        size: expectedType,
      });
    });
  });
});
