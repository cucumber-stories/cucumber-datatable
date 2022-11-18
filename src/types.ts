import { DataTable } from "@cucumber/cucumber";

export type Converter<T> = (param: string) => T;

export type ColumnNameResolver = {
  columnName: string;
};

export type PositionResolver = {
  position: number;
};

export type LineToConvert = {
  converter: Converter<unknown>;
};

export type DictionaryLine<RESOLVER> = LineToConvert & RESOLVER;

export type Dictionary<K extends keyof any, RESOLVER> = Record<
  K,
  DictionaryLine<RESOLVER>
>;

export type ConverterOutput<T> = T extends { converter: Converter<infer R> }
  ? R
  : never;

export type DictionaryOutput<D> = D extends {
  [P in keyof D]: { converter: Converter<any> };
}
  ? { [P in keyof D]: ConverterOutput<D[P]> }
  : never;

export type GherkinDataTableGetter<T> = (d: DataTable) => T[];
