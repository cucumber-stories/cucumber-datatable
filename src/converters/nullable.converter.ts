import { Converter } from "./converter";

export function nullable<R, C>(
  converter: Converter<R, C>,
  nullableConfig: { nullValue: string } = { nullValue: "<null>" }
): Converter<R | null, C> {
  return Converter.of(function (value: string) {
    if (value === nullableConfig.nullValue) {
      return null;
    }
    return converter.convert(value);
  });
}
