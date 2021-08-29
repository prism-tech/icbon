import { Encoder } from './Encoder';

export function encode(data: unknown): Uint8Array {
  return new Encoder().any(data);
}

export default encode;
