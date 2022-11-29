import { configurableConverter } from "./configurable-converter";

const converter = (v: string, config?: { foo: number }) =>
  v + (config ? config.foo : "");

it("handles config", () => {
  expect(
    configurableConverter(converter).withConfig({ foo: 42 })("bar")
  ).toEqual("bar42");
});

it("handles default config with overridden config", () => {
  expect(
    configurableConverter(converter).withConfig({ foo: 42 })("bar")
  ).toEqual("bar42");
});
