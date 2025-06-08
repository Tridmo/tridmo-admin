export const compareArrays = (a: any[], b: any[]) =>
  a.length === b.length &&
  a.every((element, index) => b.includes(element));

export const shortenUUID = (uuid: string): string => {
  if (uuid.length == 0 || uuid.length < 12) return uuid;
  return uuid.slice(0, 8);
}