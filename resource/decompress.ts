import { inflateRaw } from 'pako';
import { unpack } from './unpack';

export function decompress(data: ArrayBuffer): unknown {
  return unpack(inflateRaw(new Uint8Array(data)).buffer);
}

export default decompress;
