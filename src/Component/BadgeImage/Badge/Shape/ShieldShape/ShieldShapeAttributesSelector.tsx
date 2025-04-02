import { useState, useCallback, useEffect } from "react";
import {
  ShieldShape,
  ShieldShapeType,
  ShieldDesign,
  ShieldDesignType,
  BadgeShape,
} from "../../../../../BadgeImage";
import { FormatVariableName } from "../../../../../FormatVariableName";
import RadioGroup from "../../../../RadioGroup";
import RadioGroupOption from "../../../../RadioGroupOption";
import { ShieldShapeAttributesSelectorProperties } from "./ShieldShapeAttributesSelectorProperties";

const ShieldShapeAttributesSelector: React.FC<
  ShieldShapeAttributesSelectorProperties
> = ({ onChange }) => {
  const className = FormatVariableName.from(
    ShieldShapeAttributesSelector.name
  ).toKebab();

  const shapeLabel = "배지 형태";
  const [shieldShape, setShieldShape] = useState<ShieldShape>(
    ShieldShapeType.CLASSIC
  );

  const designLabel = "배지 종류";
  const [shieldDesign, setShieldDesign] = useState<ShieldDesign>(
    ShieldDesignType.SOLID
  );

  const onChangeShieldShapeOrShieldDesign = useCallback(
    (shield: { shieldShape: ShieldShape; shieldDesign: ShieldDesign }) => {
      onChange && onChange(BadgeShape.ShieldShape(shield));
    },
    [onChange]
  );

  useEffect(() => {
    onChangeShieldShapeOrShieldDesign({
      shieldShape,
      shieldDesign,
    });
  }, [onChangeShieldShapeOrShieldDesign, shieldDesign, shieldShape]);

  return (
    <div className={className}>
      <RadioGroup
        key={shapeLabel}
        label={shapeLabel}
        value={shieldShape}
        onChange={setShieldShape}
      >
        {Array.from<ShieldShape>([
          ShieldShapeType.CLASSIC,
          ShieldShapeType.ROUND,
          ShieldShapeType.ANGULAR,
          ShieldShapeType.SPLIT,
        ]).map((value, key) => (
          <RadioGroupOption
            key={key}
            label={value.toString()}
            value={value}
            checked={value === shieldShape}
          />
        ))}
      </RadioGroup>

      <RadioGroup
        key={designLabel}
        label={designLabel}
        value={shieldDesign}
        onChange={setShieldDesign}
      >
        {Array.from<ShieldDesign>([
          ShieldDesignType.SOLID,
          ShieldDesignType.VERTICAL,
          ShieldDesignType.HORIZONTAL,
          ShieldDesignType.DIAGONAL,
        ]).map((value, key) => (
          <RadioGroupOption
            key={key}
            label={value.toString()}
            value={value}
            checked={value === shieldDesign}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default ShieldShapeAttributesSelector;
