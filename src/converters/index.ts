import { stringConverter } from "./string.converter";
import { numberConverter } from "./number.converter";
import { yesNoToBooleanConverter } from "./yes-no-to-boolean.converter";
import { stringArrayConverter } from "./string-array.converter";
import { objectArrayConverter } from "./object-array.converter";
import { withConfig } from "./with-config.converter";
import { nullable } from "./nullable.converter";

export const Converters = {
  String: stringConverter,
  Number: numberConverter,
  YesNoToBoolean: yesNoToBooleanConverter,
  StringArray: stringArrayConverter,
  ObjectArray: objectArrayConverter,
  WithConfig: withConfig,
  Nullable: nullable,
} as const;
