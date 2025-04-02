import { ValidateNumber } from "../ValidateNumber";
import { EnglishPartProcessor } from "./EnglishPartProcessor";
import { NumberPartProcessor } from "./NumberPartProcessor";
import { Option } from "./Option";

export class FormatNumber {
  private static readonly PRESETS: {
    [key: string]: Option;
  } = {
    KOREAN: {
      units: ["", "십", "백", "천"],
      bigUnits: ["", "만", "억", "조", "경"],
      digits: ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"],
      omitLeadingOne: true,
      groupSize: 4,
      join: "",
      processor: (part: number, option: Option) =>
        new NumberPartProcessor().process(part, option),
    },
    CHINESE: {
      units: ["", "十", "百", "千"],
      bigUnits: ["", "万", "亿", "兆"],
      digits: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
      omitLeadingOne: true,
      groupSize: 4,
      join: "",
      processor: (part: number, option: Option) =>
        new NumberPartProcessor().process(part, option),
    },
    ENGLISH: {
      units: [],
      bigUnits: ["", " thousand", " million", " billion", " trillion"],
      digits: [
        "zero",
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
        new EnglishPartProcessor().process(part, option),
    },
  };

  private constructor(
    private readonly number: number,
    private readonly option: Option
  ) {
    ValidateNumber.validate(number, { isInt: true, min: 0 });
  }

  private format(): string {
    const { bigUnits, digits, groupSize = 4, join, processor } = this.option;
    const groupDivisor = Math.pow(10, groupSize);
    const parts: Array<string> = [];

    let remaining = this.number;
    let bigUnitIndex = 0;

    while (remaining > 0) {
      const part = remaining % groupDivisor;
      remaining = Math.floor(remaining / groupDivisor);

      if (part > 0) {
        parts.unshift(processor(part, this.option) + bigUnits[bigUnitIndex]);
      }
      bigUnitIndex++;
    }

    return parts.length
      ? parts.join(join).replace(/\s+/g, " ").trim()
      : digits[0];
  }

  public static toKorean(num: number): string {
    return new FormatNumber(num, this.PRESETS.KOREAN).format();
  }

  public static toEnglish(num: number): string {
    return new FormatNumber(num, this.PRESETS.ENGLISH).format();
  }

  public static toChinese(num: number): string {
    return new FormatNumber(num, this.PRESETS.CHINESE).format();
  }
}
