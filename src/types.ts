import { DataTable } from "@cucumber/cucumber";
import { Converter } from "./converters/converter";

export type ColumnNameResolver = {
  columnName: string;
};

export type PositionResolver = {
  position: number;
};

export type LineToConvert = {
  converter: Converter<any, any>;
};

export type DictionaryLine<RESOLVER> = LineToConvert & RESOLVER;

export type Dictionary<K extends keyof any, RESOLVER> = Record<
  K,
  DictionaryLine<RESOLVER>
>;

export type ConverterOutput<T> = T extends {
  converter: Converter<infer R, any>;
}
  ? R
  : never;

export type DictionaryOutput<D> = D extends {
  [P in keyof D]: { converter: Converter<any, any> };
}
  ? { [P in keyof D]: ConverterOutput<D[P]> }
  : never;

export type GherkinDataTableGetter<T> = (d: DataTable) => T[];
