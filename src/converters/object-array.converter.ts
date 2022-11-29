import {
  Dictionary,
  DictionaryLine,
  DictionaryOutput,
  LineToConvert,
  PositionResolver,
} from "../types";
import {
  applyConvertersToGherkinData,
  ConverterForKey,
} from "../cucumber-datatable";
import { Converter } from "./converter";
import { stringArrayConverter } from "./string-array.converter";

export function objectArrayConverter<
  D extends Dictionary<K, PositionResolver>,
  K extends keyof any
>(
  data: string,
  config?: {
    propertySeparator: string;
    itemSeparator: string;
    dictionary: D;
  }
): DictionaryOutput<D>[] {
  const propertySeparator = config?.propertySeparator || ":";
  const itemSeparator = config?.itemSeparator || ",";

  const dictionary = config?.dictionary;
  if (!dictionary) {
    throw new Error(
      "[cucumberDatatable][objectArrayConverter] cannot use the objectArrayConverter without giving a dictionary"
    );
  }

  const items = Converter.of(stringArrayConverter)
    .withConfig({
      separator: itemSeparator,
    })
    .convert(data);

  const itemsWithPropertiesArray = items.map((o) => o.split(propertySeparator));

  const converterForKeys: ConverterForKey[] = Object.entries<
    DictionaryLine<PositionResolver>
  >(dictionary)
    .sort(
      (
        [, { position: position1 }]: [unknown, PositionResolver],
        [, { position: position2 }]: [unknown, PositionResolver]
      ) => position1 - position2
    )
    .map(([outputKey, { converter }]: [string, LineToConvert]) => {
      return {
        outputKey: outputKey,
        converter: converter,
      };
    });

  return applyConvertersToGherkinData<D, K>(
    converterForKeys,
    itemsWithPropertiesArray
  );
}
