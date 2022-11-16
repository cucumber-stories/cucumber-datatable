import { stringConverter } from "./string.converter";
import { numberConverter } from "./number.converter";

export const Converters = {
  String: stringConverter,
  Number: numberConverter,
} as const;
