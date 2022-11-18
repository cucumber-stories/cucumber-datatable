import { Jesaispas, NestedDictionary } from "../types";
import { Converters } from "./index";
import { computeData, ConverterForKey } from "../cucumber-datatable";

export function objectArrayConverter({
  propertySeparator,
  itemSeparator,
}: {
  propertySeparator: string;
  itemSeparator: string;
}) {
  return function <D extends NestedDictionary<K>, K extends keyof any>(
    dictionary: D
  ) {
    return function (data: string) {
      const items = Converters.StringArray(data, itemSeparator);
      const itemsWithPropertiesArray = items.map((o) =>
        o.split(propertySeparator)
      );

      const output: ConverterForKey[] = Object.entries<Jesaispas>(
        dictionary
      ).map(([outputKey, { position, converter }]: [string, Jesaispas]) => {
        return {
          outputKey: outputKey,
          converter: converter,
        };
      });

      return computeData<D, K>(itemsWithPropertiesArray, output);
    };
  };
}
