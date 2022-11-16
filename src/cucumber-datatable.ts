import { DataTable } from "@cucumber/cucumber";
import {
  Dictionary,
  DictionaryLine,
  DictionaryOutput,
  GherkinDataTableGetter,
} from "./index";

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

  return (gherkinTable: DataTable) => {
    const [header, ...data] = gherkinTable.raw();

    const toOutput = header.map((columnName: string) => {
      const foundEntry = dictionaryEntries.find(
        (entry) => entry.columnName === columnName
      );
      if (!foundEntry) {
        throw new Error(
          `[cucumberDatatable]: The column '${columnName}' is not defined in the dictionary`
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
