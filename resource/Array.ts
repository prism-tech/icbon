import { concat } from './concat';
import { ICBON_TYPE_ARRAY } from './constants';
import { pack } from './pack';
import { Number } from './Number';

export function Array(data: unknown[]): ArrayBuffer {
  return concat([
    new Uint8Array([ ICBON_TYPE_ARRAY ]).buffer,
    Number(data.length),
    ...data.map((data: unknown): ArrayBuffer => pack(data)),
  ]);
}

export default Array;
