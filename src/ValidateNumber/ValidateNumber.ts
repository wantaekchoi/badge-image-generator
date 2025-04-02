import { Option } from "./Option";

export class ValidateNumber {
  public static validate(value: number, option?: Option): void | never {
    const label = option?.label ?? "value";
    if (isNaN(value)) {
      throw new Error(`${label} is not a number, value: ${value}`);
    }
    if (option) {
      const { isInt, min, max } = option;
      if (isInt && !Number.isSafeInteger(value)) {
        throw new Error(`${label} is not a safe interger value: ${value}`);
      }
      if (min !== undefined && value < min) {
        throw new Error(
          `${label} must greater than or equal ${min}, value: ${value}`
        );
      }
      if (max !== undefined && value > max) {
        throw new Error(
          `${label} must less than or equal ${max}, value: ${value}`
        );
      }
    }
  }
}
