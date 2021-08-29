import { decode } from './decode';

export function parse(data: string): unknown {
  const buffer: Uint8Array = new Uint8Array(new Uint16Array(data.split('').map((char: string): number => char.charCodeAt(0))).buffer);
  return decode(buffer);
}

export default parse;
