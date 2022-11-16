export const numberConverter = (v: string) => {
  const result = +v;
  if (Number.isNaN(result)) {
    throw new Error(
      `[cucumberDatatable][numberConverter] Cannot convert "${v}" to a number`
    );
  }
  return +v;
};
