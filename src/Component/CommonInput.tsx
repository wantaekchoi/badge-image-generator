import React, { useCallback, useEffect, useState } from "react";
import "./CommonInput.css";
import { FormatVariableName } from "../FormatVariableName";

interface CommonInputProps<T> {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  min?: number;
  max?: number;
}

const CommonInput = <T extends string | number>({
  label,
  value,
  onChange,
  placeholder,
  min,
  max,
}: CommonInputProps<T>) => {
  const className = FormatVariableName.from(CommonInput.name).toKebab();
  const type = typeof value === "number" ? "number" : "text";

  const [inputValue, setInputValue] = useState<T>(value);

  const onChangeInputValue = useCallback(
    (value: T) => {
      onChange && onChange(value);
    },
    [onChange]
  );

  useEffect(() => {
    onChangeInputValue(inputValue);
  }, [inputValue, onChangeInputValue]);

  return (
    <div className={className}>
      {label && (
        <label className={Array.from([className, "label"]).join("-")}>
          {label}
        </label>
      )}
      <input
        className={Array.from([className, "field"]).join("-")}
        type={type}
        value={inputValue}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          const value = e.target.value as T;
          setInputValue(value);
        }}
        placeholder={placeholder}
        min={type === "number" ? min : undefined}
        max={type === "number" ? max : undefined}
      />
    </div>
  );
};

export default CommonInput;
