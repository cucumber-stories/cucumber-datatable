import { Converters } from "./index";
import { objectArrayConverter } from "./object-array.converter";

describe("objectArrayConverter", () => {
  it("converts string to object array", () => {
    const converterWithSettings = objectArrayConverter({
      propertySeparator: ":",
      itemSeparator: ",",
    });

    const converterWithDictionary = converterWithSettings({
      color: {
        position: 0,
        converter: Converters.String,
      },
      quantity: {
        position: 1,
        converter: Converters.Number,
      },
    });

    expect(converterWithDictionary("Red:12, Blue:23")).toEqual([
      { color: "Red", quantity: 12 },
      { color: "Blue", quantity: 23 },
    ]);
  });

  it("works even if the positions are shuffled", () => {
    const converterWithSettings = objectArrayConverter({
      propertySeparator: ":",
      itemSeparator: ",",
    });

    const converterWithDictionary = converterWithSettings({
      quantity: {
        position: 1,
        converter: Converters.Number,
      },
      name: {
        position: 2,
        converter: Converters.String,
      },
      color: {
        position: 0,
        converter: Converters.String,
      },
    });

    expect(converterWithDictionary("Red:12:Bob, Blue:23:John")).toEqual([
      { name: "Bob", color: "Red", quantity: 12 },
      { name: "John", color: "Blue", quantity: 23 },
    ]);
  });
});
