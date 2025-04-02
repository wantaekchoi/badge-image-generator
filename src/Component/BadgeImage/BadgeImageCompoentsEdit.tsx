import { useState, useEffect } from "react";
import { Badge } from "../../BadgeImage";
import { FormatVariableName } from "../../FormatVariableName";
import TextViewer from "../TextViewer";
import { BadgeAttributeSelector } from "./Badge/BadgeAttributeSelector";
import "./BadgeImageCompoentsEdit.css";

interface BadgeImageCompoentsEditProperties {}

const BadgeImageCompoentsEdit: React.FC<
  BadgeImageCompoentsEditProperties
> = () => {
  const className = FormatVariableName.from(
    BadgeImageCompoentsEdit.name
  ).toKebab();
  const badgeComponentLable = "배지 속성";
  const [badgeComponent, setBadgeComponent] = useState<Badge | undefined>(
    undefined
  );
  const [badgeImageData, setBadgeImageData] = useState<NonNullable<object>>({});

  useEffect(() => {
    badgeComponent && setBadgeImageData(badgeComponent.toJson());
  }, [badgeComponent]);

  return (
    <div className={className}>
      <TextViewer data={badgeImageData} />
      <BadgeAttributeSelector
        label={badgeComponentLable}
        onChange={setBadgeComponent}
      />
    </div>
  );
};

export default BadgeImageCompoentsEdit;
