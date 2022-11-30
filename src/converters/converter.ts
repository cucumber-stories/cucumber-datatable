export type ConverterFunction<R, C> =
  | (<T>(v: string) => R)
  | (<T>(v: string, config?: C) => R);

export class Converter<R, C> {
  private config?: C;

  private constructor(
    private readonly converterFunction: ConverterFunction<R, C>
  ) {}

  static of<R, C = never>(converterFunction: ConverterFunction<R, C>) {
    return new Converter(converterFunction);
  }

  withConfig(config: C): this {
    this.config = config;
    return this;
  }

  convert(v: string): R {
    return this.converterFunction(v, this.config);
  }
}
