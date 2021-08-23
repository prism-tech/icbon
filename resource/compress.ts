import { deflateRaw } from 'pako';
import { pack } from './pack';

export function compress(data: unknown): ArrayBuffer {
  return deflateRaw(new Uint8Array(pack(data))).buffer;
}

export default compress;
