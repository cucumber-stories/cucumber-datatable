import { Converter } from "./converter";

const converter = (v: string, config?: { foo: number }) =>
  v + (config ? config.foo : "");

it("handles config", () => {
  expect(
    Converter.of(converter).withConfig({ foo: 42 }).convert("bar")
  ).toEqual("bar42");
});

it("handles default config with overridden config", () => {
  expect(
    Converter.of(converter)
      .withConfig({ foo: 1 })
      .withConfig({ foo: 42 })
      .convert("bar")
  ).toEqual("bar42");
});
