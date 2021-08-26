import { inflateRaw } from 'pako';
import { deserialize } from './deserialize';

export function decompress(data: Uint8Array, offset: number = 0): unknown {
  return deserialize(inflateRaw(data), offset);
}

export default decompress;
