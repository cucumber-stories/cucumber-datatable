import { stringConverter } from "./string.converter";

describe("stringConverter", () => {
  it("returns the given value", () => {
    expect(stringConverter("aValue")).toEqual("aValue");
  });
});
