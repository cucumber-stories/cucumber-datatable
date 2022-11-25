import { Converter } from "../types";

export function nullable<T, C>(
  converter: Converter<T, C>,
  nullableConfig: { nullValue: string } = { nullValue: "<null>" }
): Converter<T | null, C> {
  return function (value: string, config?: C) {
    if (value === nullableConfig.nullValue) {
      return null;
    }
    return converter(value, config);
  };
}
