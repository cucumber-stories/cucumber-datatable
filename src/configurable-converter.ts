import { Converter } from "./types";

export const configurableConverter = function <T, C = any>(
  converter: Converter<T, C>
): Converter<T> & { withConfig: (config: C) => Converter<T> } {
  const converterWithConfig = (value: string, c?: C) => {
    return converter(value, c);
  };

  converterWithConfig.withConfig = function (config: C) {
    return (value: string) => converterWithConfig(value, config);
  };

  return converterWithConfig;
};
