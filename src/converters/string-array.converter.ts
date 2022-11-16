export function stringArrayConverter(value: string): string[] {
  if (value.trim().length === 0) {
    return [];
  }

  return value.split(/ *, */);
}
