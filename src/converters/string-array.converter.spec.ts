import { stringArrayConverter } from "./string-array.converter";

describe("stringArrayConverter", () => {
  it("converts an empty string into an empty array", () => {
    expect(stringArrayConverter("")).toEqual([]);
  });

  it("converts a comma separated list in string into a string array", () => {
    expect(stringArrayConverter("one,two,three")).toEqual([
      "one",
      "two",
      "three",
    ]);
  });

  it("handles comma+space separator", () => {
    expect(stringArrayConverter("one, two, three")).toEqual([
      "one",
      "two",
      "three",
    ]);
  });

  it("handles comma+ several spaces separator", () => {
    expect(stringArrayConverter("one  , two,      three")).toEqual([
      "one",
      "two",
      "three",
    ]);
  });

  it("handles semi-colon+ several spaces separator", () => {
    expect(
      stringArrayConverter("one  ; two;      three", {
        separator: ";",
      })
    ).toEqual(["one", "two", "three"]);
  });
});
