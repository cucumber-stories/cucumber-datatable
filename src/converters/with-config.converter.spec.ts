import { withConfig } from "./with-config.converter";

const converter = (v: string, config?: { foo: number }) =>
  v + (config ? config.foo : "");

it("handles config", () => {
  expect(withConfig(converter, { foo: 42 })("bar")).toEqual("bar42");
});
