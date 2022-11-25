interface StringArrayConfig {
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

stringArrayConverter.withConfig = function (config: StringArrayConfig) {
  return (value: string) => {
    return this(value, config);
  };
};
