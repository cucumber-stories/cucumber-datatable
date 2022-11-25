import { DataTable } from "@cucumber/cucumber";
import { cucumberDataTable } from "./cucumber-datatable";
import { Converters } from "./converters";

it("maps the columns in objects", () => {
  const aDataTableFromGherkin = new DataTable([
    ["Age", "Name", "First name", "Nickname"],
    ["83", "Wayne", "Bruce", "Batman"],
    ["52", "Stark", "Tony", "Iron Man"],
    ["53", "Banner", "Robert Bruce", "Hulk"],
  ]);

  const getHeroes = cucumberDataTable({
    name: { columnName: "Name", converter: Converters.String },
    firstName: { columnName: "First name", converter: Converters.String },
    nickname: { columnName: "Nickname", converter: Converters.String },
    age: { columnName: "Age", converter: Converters.Number },
  });

  const heroes = getHeroes(aDataTableFromGherkin);
  expect(heroes).toEqual([
    {
      name: "Wayne",
      firstName: "Bruce",
      nickname: "Batman",
      age: 83,
    },
    {
      name: "Stark",
      firstName: "Tony",
      nickname: "Iron Man",
      age: 52,
    },
    {
      name: "Banner",
      firstName: "Robert Bruce",
      nickname: "Hulk",
      age: 53,
    },
  ]);
});

it("throws and error if a column is not in the dictionary", () => {
  const aDataTableFromGherkin = new DataTable([
    ["Name", "First name", "Unknown column"],
    ["Banner", "Robert Bruce", "Hulk"],
  ]);

  const getHeroes = cucumberDataTable({
    name: { columnName: "Name", converter: Converters.String },
    firstName: { columnName: "First name", converter: Converters.String },
    nickname: { columnName: "Nickname", converter: Converters.String },
  });

  expect(() => getHeroes(aDataTableFromGherkin)).toThrowError(
    "[cucumberDatatable]: The column 'Unknown column' is not defined in the dictionary"
  );
});

it("use dictionary's converter to convert the cells", () => {
  const converterMock = jest
    .fn()
    .mockReturnValue("Value returned by the converter");

  const aDataTableFromGherkin = new DataTable([["Name"], ["Banner"]]);

  const getHeroes = cucumberDataTable({
    name: { columnName: "Name", converter: converterMock },
  });

  const result = getHeroes(aDataTableFromGherkin);
  expect(result).toEqual([
    {
      name: "Value returned by the converter",
    },
  ]);

  expect(converterMock).toHaveBeenCalledWith("Banner");
});

it("works with many converters", () => {
  const aDataTableFromGherkin = new DataTable([
    ["Attributes", "Price", "Is active ?", "Tags", "VAT"],
    ["Color:Red, Name:Strawberry", "4", "yes", "red - rouge", "20%"],
    ["Color:Blue, Name:Blueberry", "7.2", "no", "blue - bleu", "null"],
  ]);

  const getHeroes = cucumberDataTable({
    price: { columnName: "Price", converter: Converters.Number },
    attributes: {
      columnName: "Attributes",
      converter: Converters.ObjectArray({
        propertySeparator: ":",
        itemSeparator: ",",
      })({
        label: {
          position: 0,
          converter: Converters.String,
        },
        value: {
          position: 1,
          converter: Converters.String,
        },
      }),
    },
    active: {
      columnName: "Is active ?",
      converter: Converters.YesNoToBoolean,
    },
    tags: {
      columnName: "Tags",
      converter: Converters.WithConfig(Converters.StringArray, {
        separator: "-",
      }),
    },
    vat: {
      columnName: "VAT",
      converter: Converters.Nullable(
        Converters.WithConfig(Converters.StringArray, { separator: "," }),
        { nullValue: "null" }
      ),
    },
  });

  const heroes = getHeroes(aDataTableFromGherkin);
  expect(heroes).toEqual([
    {
      attributes: [
        {
          label: "Color",
          value: "Red",
        },
        {
          label: "Name",
          value: "Strawberry",
        },
      ],
      price: 4,
      active: true,
      tags: ["red", "rouge"],
      vat: ["20%"],
    },
    {
      attributes: [
        {
          label: "Color",
          value: "Blue",
        },
        {
          label: "Name",
          value: "Blueberry",
        },
      ],
      price: 7.2,
      active: false,
      tags: ["blue", "bleu"],
      vat: null,
    },
  ]);
});
