import { ICBON_TYPE_NULL } from './constants';

export function Null(): ArrayBuffer {
  return new Uint8Array([ ICBON_TYPE_NULL ]).buffer;
}

export default Null;
