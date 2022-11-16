import { numberConverter } from "./number.converter";

describe("numberConverter", () => {
  it("converts the string value to a number if its possible", () => {
    expect(numberConverter("42")).toEqual(42);
  });

  it("Throws an error if the given string is not a number", () => {
    expect(() => numberConverter("NotANumber")).toThrow(
      '[cucumberDatatable][numberConverter] Cannot convert "NotANumber" to a number'
    );
  });
});
