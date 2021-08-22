import { Null } from './Null';
import { Boolean } from './Boolean';
import { Number } from './Number';
import { String } from './String';
import { Array } from './Array';
import { Hash } from './Hash';

export function pack(data: unknown): ArrayBuffer {
  if (data === null) {
    return Null();
  }

  if (typeof data === 'boolean') {
    return Boolean(data);
  }

  if (typeof data === 'number') {
    return Number(data);
  }

  if (typeof data === 'string') {
    return String(data);
  }

  if (global.Array.isArray(data)) {
    return Array(data);
  }

  if (typeof data === 'object') {
    return Hash(data as Record<string, unknown>);
  }

  throw new TypeError();
}

export default pack;
