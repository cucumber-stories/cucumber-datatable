import { expectType } from "tsd";
import { cucumberDataTable } from "./cucumber-datatable";
import { DataTable } from "@cucumber/cucumber";
import { Converters } from "./converters";

const dictionary = {
  name: { columnName: "Name", converter: Converters.String },
  nameWithDefaultConverter: { columnName: "Name with default" },
  age: { columnName: "Age", converter: Converters.Number },
  custom: {
    columnName: "Custom",
    converter: (v: string) => ({ custom: v, other: Symbol("other") }),
  },
  compound: {
    columnName: "Compound",
    converter: Converters.ObjectArray({
      itemSeparator: ",",
      propertySeparator: ":",
    })({
      title: {
        converter: Converters.StringArray,
        position: 0,
      },
      isAgree: {
        converter: Converters.YesNoToBoolean,
        position: 1,
      },
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
    nameWithDefaultConverter: string;
    age: number;
    custom: { custom: string; other: symbol };
    compound: { title: string[]; isAgree: boolean }[];
  }[]
>(result);
