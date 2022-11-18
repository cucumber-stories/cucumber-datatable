import { DateTime } from "luxon";

export function relativeDateConverter(value: string): null | Date {
  // TODO DAU: Should we handle the null values here or in a high order converter ?
  const dateShouldBeNull = ["<null>", "", undefined].includes(value);
  return dateShouldBeNull ? null : parseRelativeDate(value);
}

export const RELATIVE_DATE_REGEXP = new RegExp(/^D\s*(?:([+-]?)\s*(\d+))?/);

export function parseRelativeDate(
  value: string,
  currentDate = DateTime.now().toJSDate()
): Date {
  if (!RELATIVE_DATE_REGEXP.test(value)) {
    throw new Error(
      `[cucumberDatatable][dateConverter] The given pattern "${value}" does not satisfy the date pattern`
    );
  }
  const [, sign, amount] = RELATIVE_DATE_REGEXP.exec(value) || [];

  const date = DateTime.fromJSDate(currentDate);

  if (amount) {
    if (sign === "-") {
      return date.minus({ day: +amount }).toJSDate();
    } else if (sign === "+") {
      return date.plus({ day: +amount }).toJSDate();
    }
  }

  return date.toJSDate();
}
