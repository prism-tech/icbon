import { inflateRaw } from 'pako';
import { Decoder } from './Decoder';

export function decompress(data: ArrayBuffer): unknown {
  return new Decoder(inflateRaw(new Uint8Array(data))).any();
}

export default decompress;
