import { stringConverter } from "./string.converter";
import { numberConverter } from "./number.converter";
import { yesNoToBooleanConverter } from "./yes-no-to-boolean.converter";
import { stringArrayConverter } from "./string-array.converter";
import { objectArrayConverter } from "./object-array.converter";
import { Converter } from "./converter";

export const Converters = {
  String: new Converter(stringConverter),
  Number: new Converter(numberConverter),
  YesNoToBoolean: new Converter(yesNoToBooleanConverter),
  StringArray: new Converter(stringArrayConverter),
  ObjectArray: new Converter(objectArrayConverter),
} as const;
