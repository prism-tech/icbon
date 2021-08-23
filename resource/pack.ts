import { Null } from './Null';
import { Boolean } from './Boolean';
import { Number } from './Number';
import { String } from './String';
import { Array } from './Array';
import { Hash } from './Hash';
import { PackError } from './PackError';

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

  throw new PackError(`Invalid data type \x1b[1m${ typeof data }\x1b[0m`);
}

export default pack;
