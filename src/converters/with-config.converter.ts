import { Converter } from "../types";

export type Config = any;

export function withConfig<T, C extends Config>(
  converter: Converter<T, C>,
  config: C
): Converter<T, C> {
  return function (value: string) {
    return converter(value, config);
  };
}
