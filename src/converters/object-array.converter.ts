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

export interface ObjectArrayConverterConfig {
  propertySeparator: string;
  itemSeparator: string;
}

export function objectArrayConverter<
  D extends Dictionary<K, PositionResolver>,
  K extends keyof any
>(
  dictionary: D
): (
  data: string,
  config?: ObjectArrayConverterConfig
) => DictionaryOutput<D>[] {
  return (
    data: string,
    config: ObjectArrayConverterConfig = {
      propertySeparator: ":",
      itemSeparator: ",",
    }
  ) => {
    const items = Converter.of(stringArrayConverter)
      .withConfig({
        separator: config.itemSeparator,
      })
      .convert(data);

    const itemsWithPropertiesArray = items.map((o) =>
      o.split(config.propertySeparator)
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
}
