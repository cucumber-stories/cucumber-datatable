import { DataTable } from "@cucumber/cucumber";

type Converter<T> = (param: string) => T;

type DictionaryLine = { converter: Converter<unknown>; columnName: string };

type Dictionary<K extends keyof any> = {
  [P in K]: DictionaryLine;
};
type ConverterOutput<T> = T extends { converter: Converter<infer R> }
  ? R
  : never;
type DictionaryOutput<D> = D extends {
  [P in keyof D]: { converter: Converter<any> };
}
  ? { [P in keyof D]: ConverterOutput<D[P]> }
  : never;

type GherkinDataTableGetter<T> = (d: DataTable) => T[];

export function cucumberTable<D extends Dictionary<K>, K extends keyof any>(
  dictionary: D
): GherkinDataTableGetter<DictionaryOutput<D>> {
  const dictionaryEntries = Object.entries<DictionaryLine>(dictionary).map(
    ([outputKey, { columnName, converter }]: [string, DictionaryLine]): {
      outputKey: string;
    } & DictionaryLine => {
      return {
        outputKey,
        converter,
        columnName,
      };
    }
  );

  return (gherkinTable: DataTable) => {
    const [header, ...data] = gherkinTable.raw();

    const toOutput = header.map((columnName: string) => {
      const foundEntry = dictionaryEntries.find(
        (e) => e.columnName === columnName
      );
      if (!foundEntry) {
        throw new Error(
          `[getCucumberTable]: The column '${columnName}' is not defined in the dictionary`
        );
      }
      return foundEntry;
    });

    return data.map((row) => {
      return row.reduce((output, cell, index) => {
        const dictionaryEntry = toOutput[index]!;
        return {
          ...output,
          [dictionaryEntry.outputKey]: dictionaryEntry.converter(cell),
        };
      }, <DictionaryOutput<D>>{});
    });
  };
}
