import { concat } from './concat';
import { ICBON_TYPE_ASCII, ICBON_TYPE_UNICODE } from './constants';
import { Number } from './Number';

export function String(data: string): ArrayBuffer {
  const charCodes: number[] = data.split('').map((char: string): number => char.charCodeAt(0));

  for (let i: number = 0; i < charCodes.length; i++) {
    if (charCodes[i] > 0xFF) {
      return concat([
        new Uint8Array([ ICBON_TYPE_UNICODE ]).buffer,
        Number(charCodes.length),
        new Uint16Array(charCodes).buffer,
      ]);
    }
  }

  return concat([
    new Uint8Array([ ICBON_TYPE_ASCII ]).buffer,
    Number(charCodes.length),
    new Uint8Array(charCodes).buffer,
  ]);
}

export default String;
