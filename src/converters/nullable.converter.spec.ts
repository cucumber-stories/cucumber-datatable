import { nullable } from "./nullable.converter";
import { Converter } from "./converter";

const converter = (v: string) => v;
const converterWithConfig = (v: string, config?: { append: number }) =>
  v + (config ? config.append : "");

it("returns given text when no match with null value", () => {
  expect(nullable(new Converter(converter)).convert("Some text")).toEqual(
    "Some text"
  );
});

it("returns null when match", () => {
  expect(nullable(new Converter(converter)).convert("<null>")).toEqual(null);
});

it("returns null with default configuration", () => {
  expect(
    nullable(new Converter(converterWithConfig)).convert("<null>")
  ).toEqual(null);
});

it("returns given text with configuration", () => {
  expect(
    nullable(
      new Converter(converterWithConfig).withConfig({
        append: 42,
      }),
      { nullValue: "foo" }
    ).convert("<null>")
  ).toEqual("<null>42");
});

it("returns given text with overridden configuration", () => {
  expect(
    nullable(
      new Converter(converterWithConfig).withConfig({
        append: 1,
      }),
      { nullValue: "foo" }
    )
      .withConfig({
        append: 42,
      })
      .convert("<null>")
  ).toEqual("<null>42");
});

it("returns null with configuration", () => {
  expect(
    nullable(new Converter(converterWithConfig), { nullValue: "foo" }).convert(
      "foo"
    )
  ).toEqual(null);
});
