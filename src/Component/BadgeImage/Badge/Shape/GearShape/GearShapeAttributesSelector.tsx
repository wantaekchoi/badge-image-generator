import { useCallback, useEffect, useState } from "react";
import { FormatVariableName } from "../../../../../FormatVariableName";
import { GearShapeAttributesSelectorProperties } from "./GearShapeAttributesSelectorProperties";
import NumberInput from "../../../../NumberInput";
import { BadgeShape } from "../../../../../BadgeImage";

const GearShapeAttributesSelector: React.FC<
  GearShapeAttributesSelectorProperties
> = ({ onChange }) => {
  const className = FormatVariableName.from(
    GearShapeAttributesSelector.name
  ).toKebab();

  const gearTeethInputLabel = "톱니 개수";
  const [gearTeeth, setGearTeeth] = useState<number>(BadgeShape.GEAR_TEETH_MIN);

  const onChangeGearTheeth = useCallback(
    (gearTeeth: number) => {
      onChange &&
        onChange(
          BadgeShape.GearShape(Math.max(BadgeShape.GEAR_TEETH_MIN, gearTeeth))
        );
    },
    [onChange]
  );

  useEffect(() => {
    onChangeGearTheeth(gearTeeth);
  }, [gearTeeth, onChangeGearTheeth]);

  return (
    <div className={className}>
      <NumberInput
        label={gearTeethInputLabel}
        value={gearTeeth}
        min={BadgeShape.GEAR_TEETH_MIN}
        onChange={setGearTeeth}
      />
    </div>
  );
};

export default GearShapeAttributesSelector;
