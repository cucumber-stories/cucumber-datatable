export interface YesNoToBooleanConfig {
  yes: string;
  no: string;
}

export function yesNoToBooleanConverter(
  value: string,
  config: YesNoToBooleanConfig = {
    yes: "yes",
    no: "no",
  }
): boolean {
  switch (value) {
    case config.yes: {
      return true;
    }
    case config.no: {
      return false;
    }
    default: {
      throw new Error(
        `[cucumberDatatable][numberConverter] Cannot convert "${value}" to a boolean its neither "yes" nor "no"`
      );
    }
  }
}
