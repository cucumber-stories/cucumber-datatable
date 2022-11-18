import { DataTable } from "@cucumber/cucumber";

export type Converter<T> = (param: string) => T;

export type DictionaryLine = {
  converter: Converter<unknown>;
  columnName: string;
};

export interface Jesaispas {
  converter: Converter<unknown>;
  position: number;
}

export type NestedDictionary<K extends keyof any> = Record<K, Jesaispas>;

export type Dictionary<K extends keyof any> = Record<K, DictionaryLine>;

export type ConverterOutput<T> = T extends { converter: Converter<infer R> }
  ? R
  : never;

export type DictionaryOutput<D> = D extends {
  [P in keyof D]: { converter: Converter<any> };
}
  ? { [P in keyof D]: ConverterOutput<D[P]> }
  : never;

export type GherkinDataTableGetter<T> = (d: DataTable) => T[];
