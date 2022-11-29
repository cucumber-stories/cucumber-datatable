import { Converter } from "./converter";

export function nullable<R, C>(
  converter: Converter<R, C>,
  nullableConfig: { nullValue: string } = { nullValue: "<null>" }
): Converter<R | null, C> {
  return Converter.of(function (value: string, config?: C) {
    if (value === nullableConfig.nullValue) {
      return null;
    }

    if (config) {
      return converter.withConfig(config).convert(value);
    }

    return converter.convert(value);
  });
}
