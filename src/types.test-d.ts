import { expectType } from "tsd";
import { cucumberDatatable } from "./cucumber-datatable";
import { DataTable } from "@cucumber/cucumber";
import { Converters } from "./converters";

const getHeroes = cucumberDatatable({
  name: { columnName: "Name", converter: Converters.String },
  age: { columnName: "Age", converter: Converters.Number },
  custom: {
    columnName: "Custom",
    converter: (v: string) => ({ custom: v, other: Symbol("other") }),
  },
});

const result = getHeroes(new DataTable([["Name", "Age", "Custom"]]));

expectType<
  { name: string; age: number; custom: { custom: string; other: symbol } }[]
>(result);
