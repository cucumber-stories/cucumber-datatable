import { yesNoToBooleanConverter } from "./yes-no-to-boolean.converter";

describe("yesNoToBooleanConverter", () => {
  it("converts a yes to true", () => {
    expect(yesNoToBooleanConverter("yes")).toBe(true);
  });

  it("converts a no to false", () => {
    expect(yesNoToBooleanConverter("no")).toBe(false);
  });

  it("throws when unknown boolean", () => {
    expect(() => yesNoToBooleanConverter("true")).toThrow(
      '[cucumberDatatable][numberConverter] Cannot convert "true" to a boolean its neither "yes" nor "no"'
    );
  });
});
