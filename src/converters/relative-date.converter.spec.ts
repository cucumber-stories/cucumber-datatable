import { DateTime } from "luxon";
import { relativeDateConverter, parseRelativeDate } from "./relative-date.converter";

const currentDate = DateTime.fromISO("2020-01-15T00:30:00Z").toJSDate();

describe("relativeDateConverter", () => {
  it("returns the current date", () => {
    expect(parseRelativeDate("D ", currentDate)).toEqual(
      DateTime.fromISO("2020-01-15T00:30:00Z").toJSDate()
    );
  });

  it("returns the current date and add days", () => {
    expect(parseRelativeDate("D +11", currentDate)).toEqual(
      DateTime.fromISO("2020-01-26T00:30:00Z").toJSDate()
    );
  });

  it("returns the current date minus two day", () => {
    expect(parseRelativeDate("D-2", currentDate)).toEqual(
      DateTime.fromISO("2020-01-13T00:30:00Z").toJSDate()
    );
  });

  it("throws error if bad value", () => {
    expect(() => parseRelativeDate("toto", currentDate)).toThrowError(
      '[cucumberDatatable][dateConverter] The given pattern "toto" does not satisfy the date pattern'
    );
  });
});

describe("date converter", () => {
  it("returns a date", () => {
    expect(relativeDateConverter("D+1")).toBeInstanceOf(Date);
  });

  it("returns a null date when <null>", () => {
    expect(relativeDateConverter("<null>")).toBeNull();
  });

  it("returns a null date when empty", () => {
    expect(relativeDateConverter("")).toBeNull();
  });
});
