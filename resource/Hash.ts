import { concat } from './concat';
import { ICBON_TYPE_HASH } from './constants';
import { pack } from './pack';
import { Number } from './Number';
import { String } from './String';

export function Hash(data: Record<string, unknown>): ArrayBuffer {
  const keys: string[] = Object.keys(data);

  return concat([
    new Uint8Array([ ICBON_TYPE_HASH ]).buffer,
    Number(keys.length),
    ...keys.map((name: string): ArrayBuffer => concat([ String(name), pack(data[name]) ]))
  ]);
}

export default Hash;
