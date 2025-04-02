import { useState, useCallback, useEffect } from "react";
import { BadgeShape } from "../../../../../BadgeImage";
import { FormatNumber } from "../../../../../FormatNumber";
import { FormatVariableName } from "../../../../../FormatVariableName";
import NumberInput from "../../../../NumberInput";
import RadioGroup from "../../../../RadioGroup";
import RadioGroupOption from "../../../../RadioGroupOption";
import { PolygonShapeAttributesSelectorProperties } from "./PolygonShapeAttributesSelectorProperties";

const PolygonShapeAttributesSelector: React.FC<
  PolygonShapeAttributesSelectorProperties
> = ({ onChange }) => {
  const className = FormatVariableName.from(
    PolygonShapeAttributesSelector.name
  ).toKebab();

  const polygonSidesInputLabel = "다각형 종류";
  const [polygonSidesOptionIndex, setPolygonSidesOptionIndex] =
    useState<number>(0);

  const polygonSidesOptions: Array<string> = Array.from({
    length: 9 - BadgeShape.POLYGON_SIDES_MIN,
  }).map(
    (_, index) =>
      `${FormatNumber.toKorean(index + BadgeShape.POLYGON_SIDES_MIN)}각형`
  );

  const onChangePolygonSides = useCallback(
    (polygonSides: number) =>
      onChange &&
      onChange(
        BadgeShape.PolygonShape(
          Math.max(polygonSides, BadgeShape.POLYGON_SIDES_MIN)
        )
      ),
    [onChange]
  );

  useEffect(() => {
    if (polygonSidesOptionIndex >= polygonSidesOptions.length) {
      return;
    }
    onChangePolygonSides(
      polygonSidesOptionIndex + BadgeShape.POLYGON_SIDES_MIN
    );
  }, [
    polygonSidesOptionIndex,
    onChange,
    polygonSidesOptions,
    onChangePolygonSides,
  ]);

  const handleOptionChange = (value: number) => {
    setPolygonSidesOptionIndex(value);
  };

  const handlePolygonSidesInput = (polygonSides: number) => {
    setPolygonSidesOptionIndex(polygonSidesOptions.length);
    if (polygonSides < BadgeShape.POLYGON_SIDES_MIN) {
      return;
    }
    onChangePolygonSides(polygonSides);
  };

  return (
    <div className={className}>
      <RadioGroup<number>
        label={polygonSidesInputLabel}
        value={polygonSidesOptionIndex}
        onChange={handleOptionChange}
      >
        {[
          ...polygonSidesOptions.map((label, index) => (
            <RadioGroupOption<number>
              key={index}
              label={label}
              value={index}
              checked={polygonSidesOptionIndex === index}
            />
          )),
          <RadioGroupOption<number>
            key={polygonSidesOptions.length}
            label={"직접 입력"}
            value={polygonSidesOptions.length}
            checked={polygonSidesOptionIndex === polygonSidesOptions.length}
          >
            <NumberInput
              value={polygonSidesOptions.length + BadgeShape.POLYGON_SIDES_MIN}
              min={BadgeShape.POLYGON_SIDES_MIN}
              onChange={handlePolygonSidesInput}
            />
            각형
          </RadioGroupOption>,
        ]}
      </RadioGroup>
    </div>
  );
};

export default PolygonShapeAttributesSelector;
