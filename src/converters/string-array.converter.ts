export function stringArrayConverter(
  value: string,
  config?: { separator: string }
): string[] {
  if (value.trim().length === 0) {
    return [];
  }

  const separator = config?.separator || ",";

  const splitter = new RegExp(` *${separator} *`);

  return value.split(splitter);
}
