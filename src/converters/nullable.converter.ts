import { Converter, ConverterWithConfig } from "../types";

export function nullable<T, C>(
  converter: ConverterWithConfig<T, C>,
  nullableConfig?: { nullValue: string }
): ConverterWithConfig<T | null, C>;

export function nullable<T, C>(
  converter: Converter<T>,
  nullableConfig?: { nullValue: string }
): Converter<T | null>;

export function nullable<T, C>(
  converter: Converter<T> | ConverterWithConfig<T, C>,
  nullableConfig: { nullValue: string } = { nullValue: "<null>" }
): ConverterWithConfig<T | null, C> | Converter<T | null> {
  return function (value: string) {
    if (value === nullableConfig.nullValue) {
      return null;
    }
    return converter(value);
  };
}
