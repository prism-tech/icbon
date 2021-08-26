import { deflateRaw } from 'pako';
import { serialize } from './serialize';

export function compress(data: unknown): Uint8Array {
  return deflateRaw(serialize(data));
}

export default compress;
