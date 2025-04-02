import { ValidateNumber } from "../ValidateNumber";
import { FormatPartProcessor } from "./FormatPartProcessor";
import { Option } from "./Option";

export class NumberPartProcessor implements FormatPartProcessor {
  public process(part: number, option: Option): string {
    const { units, digits, omitLeadingOne, groupSize } = option;

    ValidateNumber.validate(groupSize, {
      isInt: true,
      min: 0,
      max: units.length,
    });

    const segments: string[] = [];
    for (let i = 0; part > 0 && i < groupSize; i++) {
      const digit = part % 10;
      part = Math.floor(part / 10);

      if (digit > 0 && digits[digit] !== undefined) {
        const shouldOmit = omitLeadingOne && digit === 1 && i > 0;
        segments.unshift((shouldOmit ? "" : digits[digit]) + units[i]);
      }
    }

    return segments.join("");
  }
}
