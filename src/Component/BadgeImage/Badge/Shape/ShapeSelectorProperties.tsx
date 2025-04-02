import { BadgeType, BadgeShape } from "../../../../BadgeImage";

export interface ShapeSelectorProperties {
    type: BadgeType;
    onChange?: (value: BadgeShape) => void;
}
