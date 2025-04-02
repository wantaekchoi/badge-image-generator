import { useState, useCallback, useEffect } from "react";
import {
  Badge,
  BadgeType,
  BadgeShape,
  SizeType,
  Fill,
  Size,
} from "../../../BadgeImage";
import { FormatVariableName } from "../../../FormatVariableName";
import ColorPicker from "../../ColorPicker";
import RadioGroup from "../../RadioGroup";
import RadioGroupOption from "../../RadioGroupOption";
import TextInput from "../../TextInput";
import ShapeSelector from "./Shape";
import "./BadgeAttributeSelector.css";

interface BadgeAttributeSelectorProperties {
  label?: string;
  onChange?: (value: Badge) => void;
}

export const BadgeAttributeSelector: React.FC<
  BadgeAttributeSelectorProperties
> = ({ label, onChange }) => {
  const className = FormatVariableName.from(
    BadgeAttributeSelector.name
  ).toKebab();

  const titleLabel = "배지 이름";
  const [title, setTitle] = useState<string>("배지");

  const shapeLabel = "배지 종류";
  const [type, setType] = useState<BadgeType>(BadgeType.CIRCLE);
  const [shape, setShape] = useState<BadgeShape>(BadgeShape.CircleShape());

  const fillLabel = "배지 색상";
  const [hexColor, setHexColor] = useState<string>("#FFFFFF");

  const sizeLabel = "배지 크기";
  const [size, setSize] = useState<SizeType>(SizeType.MEDIUM);

  const onChangeAttributes = useCallback(
    (badge: Badge) => {
      onChange && onChange(badge);
    },
    [onChange]
  );

  useEffect(() => {
    onChangeAttributes(
      Badge.withProperties({
        title: title,
        shape: shape,
        fill: Fill.HexColor(hexColor.toLocaleUpperCase()),
        size: Size.from(size),
      })
    );
  }, [title, shape, hexColor, size, onChangeAttributes]);

  return (
    <div className={className}>
      {label && (
        <label className={Array.from([className, "label"]).join("-")}>
          {label}
        </label>
      )}

      <TextInput
        key={titleLabel}
        label={titleLabel}
        value={title}
        onChange={setTitle}
      />

      <RadioGroup
        key={shapeLabel}
        label={shapeLabel}
        value={type}
        onChange={setType}
      >
        {Array.from<BadgeType>([
          BadgeType.CIRCLE,
          BadgeType.GEAR,
          BadgeType.POLYGON,
          BadgeType.SHIELD,
        ]).map((badgeType, key) => (
          <RadioGroupOption
            key={key}
            label={badgeType.toString()}
            value={badgeType}
            checked={badgeType === type}
          />
        ))}
      </RadioGroup>

      <ShapeSelector type={type} onChange={setShape} />

      <ColorPicker
        key={fillLabel}
        label={fillLabel}
        value={hexColor}
        onChange={(color: string) => setHexColor(color.toLocaleUpperCase())}
      />

      <RadioGroup
        key={sizeLabel}
        label={sizeLabel}
        value={size}
        onChange={setSize}
      >
        {Array.from<SizeType>([
          SizeType.FULL,
          SizeType.LARGE,
          SizeType.MEDIUM,
          SizeType.SMALL,
        ]).map((badgeSize, key) => (
          <RadioGroupOption
            key={key}
            label={badgeSize}
            value={badgeSize}
            checked={size === badgeSize}
          />
        ))}
      </RadioGroup>
    </div>
  );
};
