import { FormatNumber } from "./FormatNumber";

describe(FormatNumber.name, () => {
  describe(FormatNumber.toKorean, () => {
    it("should format 123456789 correctly in Korean", () => {
      const result = FormatNumber.toKorean(123456789);
      expect(result).toBe("일억이천삼백사십오만육천칠백팔십구");
    });

    it("should format 10000 correctly in Korean", () => {
      const result = FormatNumber.toKorean(10000);
      expect(result).toBe("일만");
    });

    it("should format 0 correctly in Korean", () => {
      const result = FormatNumber.toKorean(0);
      expect(result).toBe("영");
    });

    it("should format 1 correctly in Korean", () => {
      const result = FormatNumber.toKorean(1);
      expect(result).toBe("일");
    });

    it("should handle large numbers in Korean", () => {
      const result = FormatNumber.toKorean(1000000000000);
      expect(result).toBe("일조");
    });
  });

  describe(FormatNumber.toEnglish, () => {
    it("should format 123456789 correctly in English", () => {
      const result = FormatNumber.toEnglish(123456789);
      expect(result).toBe(
        "one hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine"
      );
    });

    it("should format 10000 correctly in English", () => {
      const result = FormatNumber.toEnglish(10000);
      expect(result).toBe("ten thousand");
    });

    it("should format 0 correctly in English", () => {
      const result = FormatNumber.toEnglish(0);
      expect(result).toBe("zero");
    });

    it("should format 1 correctly in English", () => {
      const result = FormatNumber.toEnglish(1);
      expect(result).toBe("one");
    });

    it("should handle large numbers in English", () => {
      const result = FormatNumber.toEnglish(1000000000000);
      expect(result).toBe("one trillion");
    });
  });

  describe(FormatNumber.toChinese, () => {
    it("should format 123456789 correctly in Chinese", () => {
      const result = FormatNumber.toChinese(123456789);
      expect(result).toBe("一亿二千三百四十五万六千七百八十九");
    });

    it("should format 10000 correctly in Chinese", () => {
      const result = FormatNumber.toChinese(10000);
      expect(result).toBe("一万");
    });

    it("should format 0 correctly in Chinese", () => {
      const result = FormatNumber.toChinese(0);
      expect(result).toBe("零");
    });

    it("should format 1 correctly in Chinese", () => {
      const result = FormatNumber.toChinese(1);
      expect(result).toBe("一");
    });

    it("should handle large numbers in Chinese", () => {
      const result = FormatNumber.toChinese(1000000000000);
      expect(result).toBe("一兆");
    });
  });

  describe("Error handling", () => {
    it("should throw an error for negative numbers", () => {
      expect(() => FormatNumber.toKorean(-1)).toThrow();
    });

    it("should throw an error for non-integer numbers", () => {
      expect(() => FormatNumber.toKorean(123.45)).toThrow();
    });
  });
});
