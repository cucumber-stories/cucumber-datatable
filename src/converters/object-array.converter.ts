import {
  Dictionary,
  DictionaryLine,
  LineToConvert,
  PositionResolver,
} from "../types";
import { Converters } from "./index";
import {
  applyConvertersToGherkinData,
  ConverterForKey,
} from "../cucumber-datatable";

export function objectArrayConverter({
  propertySeparator,
  itemSeparator,
}: {
  propertySeparator: string;
  itemSeparator: string;
}) {
  return function <
    D extends Dictionary<K, PositionResolver>,
    K extends keyof any
  >(dictionary: D) {
    return function (data: string) {
      const items = Converters.StringArray(data, { separator: itemSeparator });
      const itemsWithPropertiesArray = items.map((o) =>
        o.split(propertySeparator)
      );

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
    };
  };
}
