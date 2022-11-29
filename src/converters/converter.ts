export type ConverterFunction<R, C> = <T>(v: string, config?: C) => R;

export class Converter<R, C> {
  private config?: C;

  constructor(readonly converterFunction: ConverterFunction<R, C>) {}

  withConfig(config: C): this {
    this.config = config;
    return this;
  }

  convert(v: string): R {
    return this.converterFunction(v, this.config);
  }
}
