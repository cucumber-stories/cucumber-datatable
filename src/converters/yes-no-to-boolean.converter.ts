export function yesNoToBooleanConverter(value: string): boolean {
  switch (value) {
    case "yes": {
      return true;
    }
    case "no": {
      return false;
    }
    default: {
      throw new Error(
        `[cucumberDatatable][numberConverter] Cannot convert "${value}" to a boolean its neither "yes" nor "no"`
      );
    }
  }
}
