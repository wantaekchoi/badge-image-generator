import { PositionType } from "../constants";
import { JsonSerializable } from "../JsonSerializable";
import { JsonType } from "../JsonType";

export class Position implements JsonSerializable {
  private static readonly LABEL = "position";
  private constructor(private readonly position: PositionType) {}

  public toJson(): { [key: string]: JsonType } {
    const { position } = this;
    const json: JsonType = { type: Position.LABEL, position };
    return json;
  }

  public static TopSize(): Position {
    return new Position(PositionType.TOP);
  }

  public static MiddleSize(): Position {
    return new Position(PositionType.MIDDLE);
  }

  public static BottomSize(): Position {
    return new Position(PositionType.BOTTOM);
  }
}
