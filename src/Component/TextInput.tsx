import React from "react";
import CommonInput from "./CommonInput";

interface TextInputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => (
  <CommonInput
    label={label}
    value={value}
    onChange={(value: string) => onChange && onChange(value)}
    placeholder={placeholder}
  />
);

export default TextInput;
