import React, { ReactNode } from "react";
import "./RadioGroupOption.css";

export interface RadioGroupOptionProperties<T extends string | number> {
  label: string;
  value: T;
  checked: boolean;
  onChange?: (value: T) => void;
  children?: ReactNode;
}

const RadioGroupOption = <T extends string | number = string>({
  label,
  value,
  checked,
  onChange,
  children,
}: RadioGroupOptionProperties<T>) => {
  return (
    <div className="radio-option">
      <label>
        <input
          type="radio"
          value={String(value)}
          checked={checked}
          onChange={() => onChange && onChange(value)}
        />
        {label}
        {children && <div className="radio-option-children">{children}</div>}
      </label>
    </div>
  );
};

export default RadioGroupOption;
