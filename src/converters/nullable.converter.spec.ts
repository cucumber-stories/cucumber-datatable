import { nullable } from "./nullable.converter";

const converter = (v: string) => v;
const converterWithConfig = (v: string, config?: { append: number }) =>
  v + (config ? config.append : "");

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
    nullable(converterWithConfig, { nullValue: "foo" })("<null>", {
      append: 42,
    })
  ).toEqual("<null>42");
});

it("returns null with configuration", () => {
  expect(nullable(converterWithConfig, { nullValue: "foo" })("foo")).toEqual(
    null
  );
});
