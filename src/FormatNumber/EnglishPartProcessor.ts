import { FormatPartProcessor } from "./FormatPartProcessor";
import { Option } from "./Option";

export class EnglishPartProcessor implements FormatPartProcessor {
  public process(part: number, option: Option): string {
    const tens = [
      "",
      "ten",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];
    let result = "";
    const hundreds = Math.floor(part / 100);
    const remainder = part % 100;

    if (hundreds > 0) {
      result += `${option.digits[hundreds]} hundred `;
    }
    if (remainder >= 20) {
      result += tens[Math.floor(remainder / 10)];
      if (remainder % 10 > 0) {
        result += `-${option.digits[remainder % 10]}`;
      }
    } else if (remainder >= 10) {
      result += option.digits[remainder];
    } else if (remainder > 0) {
      result += option.digits[remainder];
    }

    return result.trim();
  }
}
