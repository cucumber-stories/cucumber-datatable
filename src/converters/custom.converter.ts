import { Converter, ConverterFunction } from "./converter";

export const customConverter = <R, C = never>(
  converterFunction: ConverterFunction<R, C>
): Converter<R, C> => {
  return Converter.of(converterFunction);
};
