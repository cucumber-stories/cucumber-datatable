import { expectType } from "tsd";
import { cucumberDataTable } from "./cucumber-datatable";
import { DataTable } from "@cucumber/cucumber";
import { Converters } from "./converters";
import { Converter } from "./converters/converter";

const CustomConverter = Converters.Custom((v: string) => ({
  custom: v,
  other: Symbol("other"),
}));

const CustomConverterWithConfig = Converters.Custom(
  (v: string, config?: { foo: string }) => ({
    custom: v,
    other: Symbol("other"),
  })
);

const dictionary = {
  name: { columnName: "Name", converter: Converters.String },
  age: { columnName: "Age", converter: Converters.Number },
  custom: {
    columnName: "Custom",
    converter: CustomConverter,
  },
  compound: {
    columnName: "Compound",
    converter: Converters.ObjectArray({
      titles: {
        converter: Converters.StringArray,
        position: 0,
      },
      names: {
        converter: Converters.StringArray.withConfig({ separator: "," }),
        position: 1,
      },
      isAgree: {
        converter: Converters.Nullable(Converters.YesNoToBoolean),
        position: 2,
      },
    }).withConfig({
      itemSeparator: ",",
      propertySeparator: ":",
    }),
  },
};
const getHeroes = cucumberDataTable(dictionary);

const result = getHeroes(
  new DataTable([["Name", "Age", "Custom", "Compound"]])
);

expectType<
  {
    name: string;
    age: number;
    custom: { custom: string; other: symbol };
    compound: { titles: string[]; names: string[]; isAgree: boolean | null }[];
  }[]
>(result);

expectType<Converter<string, never>>(Converters.String);

expectType<Converter<{ custom: string; other: symbol }, never>>(
  CustomConverter
);

expectType<Converter<{ custom: string; other: symbol }, { foo: string }>>(
  CustomConverterWithConfig
);
