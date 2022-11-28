export class Converter<R, C> {
  private config?: C;

  constructor(readonly converterFunction: (v: string, config?: C) => R) {}

  withConfig(config: C): this {
    this.config = config;
    return this;
  }

  convert(v: string): R {
    return this.converterFunction(v, this.config);
  }
}
