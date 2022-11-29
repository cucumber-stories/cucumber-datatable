import { stringConverter } from "./string.converter";
import { numberConverter } from "./number.converter";
import { yesNoToBooleanConverter } from "./yes-no-to-boolean.converter";
import { stringArrayConverter } from "./string-array.converter";
import { objectArrayConverter } from "./object-array.converter";
import { Converter } from "./converter";
import { nullable } from "./nullable.converter";
import { customConverter } from "./custom.converter";

export const Converters = {
  String: Converter.of(stringConverter),
  Number: Converter.of(numberConverter),
  YesNoToBoolean: Converter.of(yesNoToBooleanConverter),
  StringArray: Converter.of(stringArrayConverter),
  ObjectArray: Converter.of(objectArrayConverter),
  Custom: customConverter,
  Nullable: nullable,
} as const;
