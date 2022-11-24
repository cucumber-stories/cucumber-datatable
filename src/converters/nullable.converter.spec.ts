import { nullable } from "./nullable.converter";
import { configurableConverter } from "../configurable-converter";

const converter = (v: string) => v;
const converterWithConfig = configurableConverter(
  (v: string, config?: { append: number }) => v + (config ? config.append : "")
);

it("returns given text when no match with null value", () => {
  expect(nullable(converter)("Some text")).toEqual("Some text");
});

it("returns null when match", () => {
  expect(nullable(converter)("<null>")).toEqual(null);
});

it("returns null with default configuration", () => {
  expect(nullable(converterWithConfig)("<null>")).toEqual(null);
});

it("returns given text with configuration", () => {
  expect(
    nullable(
      converterWithConfig.withConfig({
        append: 42,
      }),
      { nullValue: "foo" }
    )("<null>")
  ).toEqual("<null>42");
});

it("returns given text with overridden configuration", () => {
  expect(
    nullable(converterWithConfig, { nullValue: "foo" }).withConfig({
      append: 42,
    })("<null>")
  ).toEqual("<null>42");
});

it("returns null with configuration", () => {
  expect(nullable(converterWithConfig, { nullValue: "foo" })("foo")).toEqual(
    null
  );
});
