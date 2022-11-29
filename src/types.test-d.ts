import { expectType } from "tsd";
import { cucumberDataTable } from "./cucumber-datatable";
import { DataTable } from "@cucumber/cucumber";
import { Converters } from "./converters";
import { Converter } from "./converters/converter";

const dictionary = {
  name: { columnName: "Name", converter: Converters.String },
  age: { columnName: "Age", converter: Converters.Number },
  custom: {
    columnName: "Custom",
    converter: Converters.Custom((v: string) => ({
      custom: v,
      other: Symbol("other"),
    })),
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

expectType<Converter<string, unknown>>(Converters.String);
