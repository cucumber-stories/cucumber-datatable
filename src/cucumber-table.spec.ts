import { DataTable } from "@cucumber/cucumber";
import { cucumberTable } from "./cucumber-table";
import { Converter } from "./converter";

describe("cucumberTable", () => {
  it("maps the columns in objects", () => {
    const aDataTableFromGherkin = new DataTable([
      ["Name", "First name", "Nickname"],
      ["Wayne", "Bruce", "Batman"],
      ["Stark", "Tony", "Iron Man"],
      ["Banner", "Robert Bruce", "Hulk"],
    ]);

    const getHeroes = cucumberTable({
      name: { columnName: "Name", converter: Converter.String },
      firstName: { columnName: "First name", converter: Converter.String },
      nickname: { columnName: "Nickname", converter: Converter.String },
    });

    const heroes = getHeroes(aDataTableFromGherkin);
    expect(heroes).toEqual([
      {
        name: "Wayne",
        firstName: "Bruce",
        nickname: "Batman",
      },
      {
        name: "Stark",
        firstName: "Tony",
        nickname: "Iron Man",
      },
      {
        name: "Banner",
        firstName: "Robert Bruce",
        nickname: "Hulk",
      },
    ]);
  });

  it("throws and error if a column is not in the dictionary", () => {
    const aDataTableFromGherkin = new DataTable([
      ["Name", "First name", "Unknown column"],
      ["Banner", "Robert Bruce", "Hulk"],
    ]);

    const getHeroes = cucumberTable({
      name: { columnName: "Name", converter: Converter.String },
      firstName: { columnName: "First name", converter: Converter.String },
      nickname: { columnName: "Nickname", converter: Converter.String },
    });

    expect(() => getHeroes(aDataTableFromGherkin)).toThrowError(
      "[getCucumberTable]: The column 'Unknown column' is not defined in the dictionary"
    );
  });

  it("use dictionary's converter to convert the cells", () => {
    const converterMock = jest
      .fn()
      .mockReturnValue("Value returned by the converter");

    const aDataTableFromGherkin = new DataTable([["Name"], ["Banner"]]);

    const getHeroes = cucumberTable({
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
});
