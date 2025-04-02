import React, { ReactNode } from "react";
import "./RadioGroup.css";

interface RadioGroupProps<T extends string | number> {
  label: string;
  value: T;
  onChange?: (value: T) => void;
  children?: ReactNode;
}

const RadioGroup = <T extends string | number = string>({
  label,
  value,
  onChange,
  children,
}: RadioGroupProps<T>) => {
  return (
    <div className="radio-group-container">
      <label className="radio-group-label">{label}</label>
      <div className="radio-group-options">
        {children &&
          React.Children.map(children, (child) => {
            if (
              React.isValidElement(child) &&
              typeof child.props === "object" &&
              child.props !== null &&
              "value" in child.props &&
              child.props.value !== undefined
            ) {
              return React.cloneElement(
                child as React.ReactElement<{
                  value: T;
                  checked?: boolean;
                  onChange?: (value: T) => void;
                }>,
                {
                  checked: child.props.value === value,
                  onChange,
                }
              );
            }
            return child;
          })}
      </div>
    </div>
  );
};

export default RadioGroup;
