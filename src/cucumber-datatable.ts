import { DataTable } from "@cucumber/cucumber";
import {
  Converter,
  Dictionary,
  DictionaryLine,
  DictionaryOutput,
  GherkinDataTableGetter,
} from "./types";

export interface ConverterForKey {
  outputKey: string;
  converter: Converter<unknown>;
}

export function computeData<D extends Dictionary<K>, K extends keyof any>(
  data: string[][],
  converters: ConverterForKey[]
): DictionaryOutput<D>[] {
  return data.map((row) => {
    return row.reduce((output, cell, index) => {
      const dictionaryEntry = converters[index]!;
      return {
        ...output,
        [dictionaryEntry.outputKey]: dictionaryEntry.converter(cell),
      };
    }, <DictionaryOutput<D>>{});
  });
}

export function cucumberDatatable<D extends Dictionary<K>, K extends keyof any>(
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

  return (gherkinTable: DataTable): DictionaryOutput<D>[] => {
    const [header, ...data] = gherkinTable.raw();

    const converterForKeys = header.map(
      (columnName: string): ConverterForKey => {
        const foundEntry = dictionaryEntries.find(
          (entry) => entry.columnName === columnName
        );
        if (!foundEntry) {
          throw new Error(
            `[cucumberDatatable]: The column '${columnName}' is not defined in the dictionary`
          );
        }
        return {
          outputKey: foundEntry.outputKey,
          converter: foundEntry.converter,
        };
      }
    );

    return computeData<D, K>(data, converterForKeys);
  };
}
