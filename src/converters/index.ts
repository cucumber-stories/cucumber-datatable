import { stringConverter } from "./string.converter";
import { numberConverter } from "./number.converter";
import { yesNoToBooleanConverter } from "./yes-no-to-boolean.converter";
import { stringArrayConverter } from "./string-array.converter";
import { objectArrayConverter } from "./object-array.converter";

export const Converters = {
  String: stringConverter,
  Number: numberConverter,
  YesNoToBoolean: yesNoToBooleanConverter,
  StringArray: stringArrayConverter,
  ObjectArray: objectArrayConverter,
} as const;
