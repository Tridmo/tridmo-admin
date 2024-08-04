export const compareArrays = (a: any[], b: any[]) =>
  a.length === b.length &&
  a.every((element, index) => b.includes(element));