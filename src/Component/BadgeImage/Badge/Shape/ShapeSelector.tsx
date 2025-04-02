import { useState, useCallback, useEffect } from "react";
import { BadgeType, BadgeShape } from "../../../../BadgeImage";
import { FormatVariableName } from "../../../../FormatVariableName";
import { ShapeSelectorProperties } from "./ShapeSelectorProperties";
import GearShapeSelector from "./GearShape";
import PolygonShapeSelector from "./PolygonShape";
import ShieldShapeSelector from "./ShieldShape";

export const ShapeSelector: React.FC<ShapeSelectorProperties> = ({
  type,
  onChange,
}) => {
  const className = FormatVariableName.from(ShapeSelector.name).toKebab();
  const [shape, setShape] = useState<BadgeShape>(BadgeShape.CircleShape());

  const onChageBadgeShape = useCallback(
    (badgeShape: BadgeShape) => {
      onChange && onChange(badgeShape);
    },
    [onChange]
  );

  useEffect(() => {
    onChageBadgeShape(shape);
  }, [shape, onChageBadgeShape]);

  const renderShapeSelector = (type: BadgeType) => {
    switch (type) {
      case BadgeType.CIRCLE:
        setShape(BadgeShape.CircleShape());
        return;
      case BadgeType.GEAR:
        return <GearShapeSelector onChange={setShape} />;
      case BadgeType.POLYGON:
        return <PolygonShapeSelector onChange={setShape} />;
      case BadgeType.SHIELD:
        return <ShieldShapeSelector onChange={setShape} />;
    }
  };

  return <div className={className}>{renderShapeSelector(type)}</div>;
};
