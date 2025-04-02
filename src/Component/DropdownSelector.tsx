import React from "react";
import "./DropdownSelector.css";

interface DropdownSelectorProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  label,
  options,
  value,
  onChange,
}) => (
  <div className="dropdown-selector-container">
    <label className="dropdown-selector-label">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="dropdown-selector-field"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default DropdownSelector;
