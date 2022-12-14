import { DataTable } from "@cucumber/cucumber";
import {
  ColumnNameResolver,
  Dictionary,
  DictionaryLine,
  DictionaryOutput,
  GherkinDataTableGetter,
} from "./types";
import { Converter } from "./converters/converter";

export interface ConverterForKey {
  outputKey: string;
  converter: Converter<any, any>;
}

export function applyConvertersToGherkinData<
  D extends Dictionary<K, any>,
  K extends keyof any
>(
  converters: ConverterForKey[],
  gherkinData: string[][]
): DictionaryOutput<D>[] {
  return gherkinData.map((row) => {
    return row.reduce((output, cell, index) => {
      const dictionaryEntry = converters[index]!;
      return {
        ...output,
        [dictionaryEntry.outputKey]: dictionaryEntry.converter.convert(cell),
      };
    }, <DictionaryOutput<D>>{});
  });
}

export function cucumberDataTable<
  D extends Dictionary<K, ColumnNameResolver>,
  K extends keyof any
>(dictionary: D): GherkinDataTableGetter<DictionaryOutput<D>> {
  const dictionaryEntries = Object.entries<DictionaryLine<ColumnNameResolver>>(
    dictionary
  ).map(
    ([outputKey, { columnName, converter }]: [
      string,
      DictionaryLine<ColumnNameResolver>
    ]): {
      outputKey: string;
    } & DictionaryLine<ColumnNameResolver> => {
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

    return applyConvertersToGherkinData<D, K>(converterForKeys, data);
  };
}
