import { Config } from "./with-config.converter";

interface StringArrayConfig extends Config {
  separator: string;
}

export function stringArrayConverter(
  value: string,
  config: StringArrayConfig = { separator: "," }
): string[] {
  if (value.trim().length === 0) {
    return [];
  }

  const splitter = new RegExp(` *${config.separator} *`);

  return value.split(splitter);
}
