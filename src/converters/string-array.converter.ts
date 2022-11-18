export function stringArrayConverter(value: string, separator = ","): string[] {
  if (value.trim().length === 0) {
    return [];
  }

  const splitter = new RegExp(` *${separator} *`);

  return value.split(splitter);
}
