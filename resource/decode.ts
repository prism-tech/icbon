import { Decoder } from './Decoder';

export function decode(data: Uint8Array, offset: number = 0): unknown {
  return new Decoder(data, offset).any();
}

export default decode;
