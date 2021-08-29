import { encode } from './encode';

export function stringify(data: unknown): string {
  const buffer: Uint16Array = new Uint16Array(encode(data).buffer);
  return Array.prototype.map.call(buffer, (code: number): string => {
    return String.fromCharCode(code);
  }).join('');
}

export default stringify;
