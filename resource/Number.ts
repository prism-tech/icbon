import { concat } from './concat';
import {
  ICBON_TYPE_FLOAT32,
  ICBON_TYPE_FLOAT64,
  ICBON_TYPE_INT8,
  ICBON_TYPE_UINT8,
  ICBON_TYPE_INT16,
  ICBON_TYPE_UINT16,
  ICBON_TYPE_INT32,
  ICBON_TYPE_UINT32,
} from './constants';

const ICBON_UNION_NUMBER: Readonly<number[]> = [
  ICBON_TYPE_UINT8,
  ICBON_TYPE_INT8,
  ICBON_TYPE_UINT16,
  ICBON_TYPE_INT16,
  ICBON_TYPE_UINT32,
  ICBON_TYPE_INT32,
  ICBON_TYPE_FLOAT32,
  ICBON_TYPE_FLOAT64,
];

type NumberBuffer = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
type NumberBufferConstructor = typeof Int8Array | typeof Uint8Array | typeof Int16Array | typeof Uint16Array | typeof Int32Array | typeof Uint32Array | typeof Float32Array | typeof Float64Array;

const ICBON_UNION_BUFFER_CONSTRUCTOR: Record<number, NumberBufferConstructor> = {
  [ ICBON_TYPE_UINT8 ]: Uint8Array,
  [ ICBON_TYPE_INT8 ]: Int8Array,
  [ ICBON_TYPE_UINT16 ]: Uint16Array,
  [ ICBON_TYPE_INT16 ]: Int16Array,
  [ ICBON_TYPE_UINT32 ]: Uint32Array,
  [ ICBON_TYPE_INT32 ]: Int32Array,
  [ ICBON_TYPE_FLOAT32 ]: Float32Array,
  [ ICBON_TYPE_FLOAT64 ]: Float64Array,
};

export function Number(data: number): ArrayBuffer {
  if (!isFinite(data)) {
    throw new TypeError();
  }

  for (let i: number = 0; i < ICBON_UNION_NUMBER.length; i++) {
    const type: number = ICBON_UNION_NUMBER[i];
    const bufferConstructor: NumberBufferConstructor = ICBON_UNION_BUFFER_CONSTRUCTOR[type];
    const buffer: NumberBuffer = new bufferConstructor([ data ]);

    if (buffer[0] === data) {
      return concat([ new Uint8Array([ type ]).buffer, buffer.buffer ]);
    }
  }

  throw new TypeError();
}

export default Number;
