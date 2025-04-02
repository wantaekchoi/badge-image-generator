import { NumberPartProcessor } from "./NumberPartProcessor";
import { Option } from "./Option";

describe("NumberPartProcessor", () => {
  const processor = new NumberPartProcessor();
  const koreanOption: Option = {
    units: ["", "십", "백", "천"],
    bigUnits: [],
    digits: ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"],
    omitLeadingOne: true,
    groupSize: 4,
    join: "",
    processor: (part: number, option: Option) => {
      throw new Error("Not implement.");
    },
  };

  // 1. 기본 숫자 변환 테스트
  describe("Basic number conversion", () => {
    it("0 → 빈 문자열 (상위에서 처리)", () => {
      expect(processor.process(0, koreanOption)).toBe("");
    });

    it("5 → 오", () => {
      expect(processor.process(5, koreanOption)).toBe("오");
    });

    it("1234 → 이백삼십사", () => {
      expect(processor.process(1234, koreanOption)).toBe("천이백삼십사");
    });
  });

  // 2. omitLeadingOne 옵션 테스트
  describe("omitLeadingOne option", () => {
    it("true: 100 → 백", () => {
      expect(processor.process(100, koreanOption)).toBe("백");
    });

    it("false: 100 → 일백", () => {
      const option = { ...koreanOption, omitLeadingOne: false };
      expect(processor.process(100, option)).toBe("일백");
    });
  });

  // 3. groupSize 제한 테스트
  describe("groupSize limit", () => {
    it("groupSize=3: 1234 → 이백삼십사", () => {
      const option = { ...koreanOption, groupSize: 3 };
      expect(processor.process(1234, option)).toBe("이백삼십사");
    });

    it("groupSize=5: 12345, → 만이천삼백사십오", () => {
      const option = {
        ...koreanOption,
        groupSize: 5,
        units: [...koreanOption.units, "만"],
      };
      expect(processor.process(12345, option)).toBe("만이천삼백사십오");
    });
  });

  // 4. 다른 언어 옵션 테스트
  describe("Different language options", () => {
    const chineseOption: Option = {
      units: ["", "十", "百", "千"],
      bigUnits: [],
      digits: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
      omitLeadingOne: false,
      groupSize: 4,
      join: "",
      processor: (part: number, option: Option) => {
        throw new Error("Not implement.");
      },
    };

    it("1234 → 一千二百三十四", () => {
      expect(processor.process(1234, chineseOption)).toBe("一千二百三十四");
    });

    it("100 → 百", () => {
      expect(processor.process(100, chineseOption)).toBe("一百");
    });
  });
});
