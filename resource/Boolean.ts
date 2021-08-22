import { ICBON_TYPE_BOOLEAN } from './constants';

export function Boolean(data: boolean): ArrayBuffer {
  return new Uint8Array([ ICBON_TYPE_BOOLEAN, Number(data) ]).buffer;
}

export default Boolean;
