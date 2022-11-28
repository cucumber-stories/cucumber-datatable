import { Converter, ConverterToConfigure } from "./types";

export const configurableConverter = function <T, C = any>(
  converter: ConverterToConfigure<T, C>
): Converter<T> & { withConfig: (config: C) => Converter<T> } {
  const converterWithConfig = (value: string) => {
    return converter(value);
  };

  converterWithConfig.withConfig = function (config: C) {
    return (value: string) => {
      return converter(value, config);
    };
  };

  return converterWithConfig;
};
