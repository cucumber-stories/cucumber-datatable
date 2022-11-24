import { Converter } from "../types";

export function withConfig<T, C>(
  converter: Converter<T, C>,
  config: C
): Converter<T, C> {
  return function (value: string) {
    return converter(value, config);
  };
}
