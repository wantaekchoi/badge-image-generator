import { EnglishPartProcessor } from "./EnglishPartProcessor";
import { Option } from "./Option";

describe("EnglishPartProcessor", () => {
  const processor = new EnglishPartProcessor();

  // 공통 테스트 옵션 설정
  const englishOption: Option = {
    units: [],
    bigUnits: [],
    digits: [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ],
    omitLeadingOne: false,
    groupSize: 3,
    join: " ",
    processor: (part: number, option: Option) =>
      processor.process(part, option),
  };

  // 1. 기본 숫자 테스트 (0~9)
  it("should format 0 → 빈 문자열 (상위에서 처리)", () => {
    expect(processor.process(0, englishOption)).toBe("");
  });

  it("should format 5 → five", () => {
    expect(processor.process(5, englishOption)).toBe("five");
  });

  // 2. 10~19 테스트
  it("should format 10 → ten", () => {
    expect(processor.process(10, englishOption)).toBe("ten");
  });

  it("should format 15 → fifteen", () => {
    expect(processor.process(15, englishOption)).toBe("fifteen");
  });

  // 3. 20~99 테스트
  it("should format 20 → twenty", () => {
    expect(processor.process(20, englishOption)).toBe("twenty");
  });

  it("should format 45 → forty-five", () => {
    expect(processor.process(45, englishOption)).toBe("forty-five");
  });

  // 4. 100~999 테스트
  it("should format 100 → one hundred", () => {
    expect(processor.process(100, englishOption)).toBe("one hundred");
  });

  it("should format 123 → one hundred twenty-three", () => {
    expect(processor.process(123, englishOption)).toBe(
      "one hundred twenty-three"
    );
  });

  it("should format 205 → two hundred five", () => {
    expect(processor.process(205, englishOption)).toBe("two hundred five");
  });

  // 5. 경계 조건 테스트
  it("should format 999 → nine hundred ninety-nine", () => {
    expect(processor.process(999, englishOption)).toBe(
      "nine hundred ninety-nine"
    );
  });

  it("should format 500 → five hundred", () => {
    expect(processor.process(500, englishOption)).toBe("five hundred");
  });
});
