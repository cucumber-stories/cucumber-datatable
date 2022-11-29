import { stringConverter } from "./string.converter";
import { numberConverter } from "./number.converter";
import { yesNoToBooleanConverter } from "./yes-no-to-boolean.converter";
import { stringArrayConverter } from "./string-array.converter";
import { objectArrayConverter } from "./object-array.converter";
import { Converter } from "./converter";
import { nullable } from "./nullable.converter";
import { customConverter } from "./custom.converter";
import { Dictionary, PositionResolver } from "../types";

export class Converters {
  static get String() {
    return Converter.of(stringConverter);
  }

  static get Number() {
    return Converter.of(numberConverter);
  }

  static get YesNoToBoolean() {
    return Converter.of(yesNoToBooleanConverter);
  }

  static get StringArray() {
    return Converter.of(stringArrayConverter);
  }

  static ObjectArray<
    D extends Dictionary<K, PositionResolver>,
    K extends keyof any
  >(dictionary: D) {
    return Converter.of(objectArrayConverter(dictionary));
  }

  static get Custom() {
    return customConverter;
  }

  static get Nullable() {
    return nullable;
  }
}
