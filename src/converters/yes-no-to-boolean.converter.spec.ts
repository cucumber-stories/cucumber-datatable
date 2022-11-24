import { yesNoToBooleanConverter } from "./yes-no-to-boolean.converter";

describe("yesNoToBooleanConverter", () => {
  it("converts a yes to true", () => {
    expect(yesNoToBooleanConverter("yes")).toBe(true);
  });

  it("converts a no to false", () => {
    expect(yesNoToBooleanConverter("no")).toBe(false);
  });

  it("converts a config 'oui' to true", () => {
    expect(yesNoToBooleanConverter("oui", { yes: "oui", no: "non" })).toBe(
      true
    );
  });

  it("converts a config 'no' to false", () => {
    expect(yesNoToBooleanConverter("non", { yes: "oui", no: "non" })).toBe(
      false
    );
  });

  it("throws when unknown boolean", () => {
    expect(() => yesNoToBooleanConverter("true")).toThrow(
      '[cucumberDatatable][numberConverter] Cannot convert "true" to a boolean its neither "yes" nor "no"'
    );
  });
});
