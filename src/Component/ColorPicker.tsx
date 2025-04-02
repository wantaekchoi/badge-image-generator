import React, { useCallback, useEffect, useState } from "react";
import "./ColorPicker.css";
import { FormatVariableName } from "../FormatVariableName";

interface ColorPickerProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
}) => {
  const className = FormatVariableName.from(ColorPicker.name).toKebab();
  const whiteColor = "#FFFFFF";

  const [color, setColor] = useState<string>(value ?? whiteColor);

  const onChangeColor = useCallback(
    (value: string) => {
      onChange && onChange(value);
    },
    [onChange]
  );

  useEffect(() => {
    onChangeColor(color);
  }, [color, onChangeColor]);

  return (
    <div className={className}>
      {label && (
        <label className={Array.from([className, "label"]).join("-")}>
          {label}
        </label>
      )}
      <input
        className={Array.from([className, "field"]).join("-")}
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
};

export default ColorPicker;
