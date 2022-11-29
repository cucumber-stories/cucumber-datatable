import { nullable } from "./nullable.converter";
import { Converter } from "./converter";

const converter = (v: string) => v;
const converterWithConfig = (v: string, config?: { append: number }) =>
  v + (config ? config.append : "");

it("returns given text when no match with null value", () => {
  expect(nullable(Converter.of(converter)).convert("Some text")).toEqual(
    "Some text"
  );
});

it("returns null when match", () => {
  expect(nullable(Converter.of(converter)).convert("<null>")).toEqual(null);
});

it("returns null with default configuration", () => {
  expect(nullable(Converter.of(converterWithConfig)).convert("<null>")).toEqual(
    null
  );
});

it("returns given text with configuration", () => {
  expect(
    nullable(
      Converter.of(converterWithConfig).withConfig({
        append: 42,
      }),
      { nullValue: "foo" }
    ).convert("<null>")
  ).toEqual("<null>42");
});

it("returns given text with overridden configuration", () => {
  expect(
    nullable(
      Converter.of(converterWithConfig).withConfig({
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
    nullable(Converter.of(converterWithConfig), { nullValue: "foo" }).convert(
      "foo"
    )
  ).toEqual(null);
});
