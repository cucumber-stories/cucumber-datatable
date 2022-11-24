import { configurableConverter } from "../configurable-converter";

export interface StringArrayConfig {
  separator: string;
}

export const stringArrayConverter = configurableConverter(
  (value: string, config: StringArrayConfig = { separator: "," }): string[] => {
    if (value.trim().length === 0) {
      return [];
    }

    const splitter = new RegExp(` *${config.separator} *`);

    return value.split(splitter);
  }
);
