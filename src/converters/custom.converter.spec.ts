import { customConverter } from "./custom.converter";
import { Converter } from "./converter";

it("build a converter", () => {
  const converterFunction = (v: string) => v;

  expect(customConverter(converterFunction)).toStrictEqual(
    new Converter(converterFunction)
  );
});
