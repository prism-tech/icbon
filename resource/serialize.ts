import { Encoder } from './Encoder';

export function serialize(data: unknown): Uint8Array {
  return new Encoder().any(data);
}

export default serialize;
