import { SizeType } from "../constants";
import { JsonSerializable } from "../JsonSerializable";
import { JsonType } from "../JsonType";

export class Size implements JsonSerializable {
  private static readonly LABEL = "size";
  private constructor(private readonly size: SizeType) {}

  public toJson() {
    const { size } = this;
    const json: JsonType = { type: Size.LABEL, size };
    return json;
  }

  public static FullSize(): Size {
    return new Size(SizeType.FULL);
  }

  public static LargeSize(): Size {
    return new Size(SizeType.LARGE);
  }

  public static MediumSize(): Size {
    return new Size(SizeType.MEDIUM);
  }

  public static SmallSize(): Size {
    return new Size(SizeType.SMALL);
  }

  public static from(size: SizeType): Size {
    return new Size(size);
  }
}
