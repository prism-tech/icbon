import { deflateRaw } from 'pako';
import { Encoder } from './Encoder';

export function compress(data: unknown): ArrayBuffer {
  return deflateRaw(new Encoder().any(data)).buffer;
}

export default compress;
