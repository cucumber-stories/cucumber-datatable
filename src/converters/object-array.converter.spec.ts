import { Converters } from "./index";
import { objectArrayConverter } from "./object-array.converter";

it("converts object to array", () => {
  const converterWithSettings = objectArrayConverter({
    propertySeparator: ":",
    itemSeparator: ",",
  });

  const converterWithDictionnary = converterWithSettings({
    color: {
      position: 0,
      converter: Converters.String,
    },
    quantity: {
      position: 1,
      converter: Converters.Number,
    },
  });

  expect(converterWithDictionnary("Red:12, Blue:23")).toEqual([
    { color: "Red", quantity: 12 },
    { color: "Blue", quantity: 23 },
  ]);
});
