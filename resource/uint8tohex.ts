export function uint8tohex(number: number): string {
  const string: string = number.toString(16).toUpperCase();
  return `0x${ string.length === 1 ? `0${ string }` : string }`;
}

export default uint8tohex;
