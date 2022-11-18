import { DataTable } from "@cucumber/cucumber";

export type Converter<T> = (param: string) => T;

export type ColumnNameResolver = {
  columnName: string;
};

export type PositionResolver = {
  position: number;
};

export type LineToConvert = {
  converter?: Converter<unknown>;
};

export type DictionaryLine<RESOLVER> = LineToConvert & RESOLVER;

export type Dictionary<K extends keyof any, RESOLVER> = Record<
  K,
  DictionaryLine<RESOLVER>
>;

export type ConverterOutput<T> = T extends { converter: Converter<infer R> }
  ? R
  : string;

export type DictionaryOutput<D> = { [P in keyof D]: ConverterOutput<D[P]> };

export type GherkinDataTableGetter<T> = (d: DataTable) => T[];
