import { Converters } from "./index";
import { objectArrayConverter } from "./object-array.converter";

describe("objectArrayConverter", () => {
  it("converts string to object array", () => {
    const dictionary = {
      color: {
        position: 0,
        converter: Converters.String,
      },
      quantity: {
        position: 1,
        converter: Converters.Number,
      },
    };
    const config = {
      propertySeparator: ":",
      itemSeparator: ",",
    };

    expect(objectArrayConverter(dictionary)("Red:12, Blue:23", config)).toEqual(
      [
        { color: "Red", quantity: 12 },
        { color: "Blue", quantity: 23 },
      ]
    );
  });

  it("works even if the positions are shuffled", () => {
    const dictionary = {
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
    };
    const config = {
      propertySeparator: ":",
      itemSeparator: ",",
    };

    expect(
      objectArrayConverter(dictionary)("Red:12:Bob, Blue:23:John", config)
    ).toEqual([
      { name: "Bob", color: "Red", quantity: 12 },
      { name: "John", color: "Blue", quantity: 23 },
    ]);
  });
});
