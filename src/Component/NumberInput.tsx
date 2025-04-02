import React from "react";
import CommonInput from "./CommonInput";

interface NumberInputProps {
  label?: string;
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
}) => (
  <CommonInput
    label={label}
    value={value}
    onChange={(val: number) => onChange && onChange(val as number)}
    min={min}
    max={max}
  />
);

export default NumberInput;
