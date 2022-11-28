import { Converter, ConverterToConfigure } from "../types";

export function nullable<T, C>(
  converter: Converter<T> | ConverterToConfigure<T, C>,
  nullableConfig: { nullValue: string } = { nullValue: "<null>" }
): Converter<T> | ConverterToConfigure<T | null, C> {
  return function (value: string, config?: C) {
    if (value === nullableConfig.nullValue) {
      return null;
    }
    return converter(value, config);
  };
}
