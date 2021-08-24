import {
  ICBON_TYPE_ARRAY,
  ICBON_TYPE_ASCII,
  ICBON_TYPE_BOOLEAN,
  ICBON_TYPE_FLOAT32,
  ICBON_TYPE_FLOAT64,
  ICBON_TYPE_HASH,
  ICBON_TYPE_INT16,
  ICBON_TYPE_INT32,
  ICBON_TYPE_INT8,
  ICBON_TYPE_NULL,
  ICBON_TYPE_UINT16,
  ICBON_TYPE_UINT32,
  ICBON_TYPE_UINT8,
  ICBON_TYPE_UNICODE,
} from './constants';
import { concat } from './concat';
import { EncodeError } from './EncodeError';

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

const UNICODE_REGEXP: RegExp = /[^\u0000-\u00ff]/;

export class Encoder {

  public readonly any: Encoder.AnyEncoder = (data: unknown): Uint8Array => {
    if (data === null) {
      return this.null();
    }

    if (typeof data === 'boolean') {
      return this.boolean(data);
    }

    if (typeof data === 'number') {
      return this.number(data);
    }

    if (typeof data === 'string') {
      return this.string(data);
    }

    if (global.Array.isArray(data)) {
      return this.array(data);
    }

    if (typeof data === 'object') {
      return this.hash(data as Record<string, unknown>);
    }

    throw new EncodeError(`\x1b[1m${ data }\x1b[0m is not a valid JSON RFC8259 value`);
  };

  public readonly null: Encoder.NullEncoder = (): Uint8Array => {
    return new Uint8Array([ ICBON_TYPE_NULL ]);
  };

  public readonly boolean: Encoder.BooleanEncoder = (data: boolean): Uint8Array => {
    return new Uint8Array([ ICBON_TYPE_BOOLEAN, Number(data) ]);
  };

  public readonly number: Encoder.NumberEncoder = (data: number): Uint8Array => {
    if (!isFinite(data)) {
      throw new EncodeError(`\x1b[1m${ data }\x1b[0m is not a valid JSON RFC8259 value`);
    }

    for (let i: number = 0; i < ICBON_UNION_NUMBER.length; i++) {
      const type: number = ICBON_UNION_NUMBER[i];
      const bufferConstructor: NumberBufferConstructor = ICBON_UNION_BUFFER_CONSTRUCTOR[type];
      const buffer: NumberBuffer = new bufferConstructor([ data ]);

      if (buffer[0] === data) {
        return concat([
          new Uint8Array([ type ]),
          new Uint8Array(buffer.buffer),
        ]);
      }
    }

    throw new EncodeError(`\x1b[1m${ data }\x1b[0m encode failed`);
  };

  public readonly string: Encoder.StringEncoder = (data: string): Uint8Array => {
    const charCodes: number[] = data.split('').map((char: string): number => char.charCodeAt(0));

    if (UNICODE_REGEXP.test(data)) {
      return concat([
        new Uint8Array([ ICBON_TYPE_UNICODE ]),
        this.number(charCodes.length),
        new Uint8Array(new Uint16Array(charCodes).buffer),
      ]);
    }

    return concat([
      new Uint8Array([ ICBON_TYPE_ASCII ]),
      this.number(charCodes.length),
      new Uint8Array(charCodes),
    ]);
  };

  public readonly array: Encoder.ArrayEncoder = (data: unknown[]): Uint8Array => {
    return concat([
      new Uint8Array([ ICBON_TYPE_ARRAY ]),
      this.number(data.length),
      ...data.map((data: unknown): Uint8Array => this.any(data)),
    ]);
  };

  public readonly hash: Encoder.HashEncoder = (data: Record<string, unknown>): Uint8Array => {
    const keys: string[] = Object.keys(data);

    return concat([
      new Uint8Array([ ICBON_TYPE_HASH ]),
      this.number(keys.length),
      ...keys.map((name: string): Uint8Array => concat([ this.string(name), this.any(data[name]) ])),
    ]);
  };

}

export namespace Encoder {
  export type AnyEncoder = (data: unknown) => Uint8Array;
  export type NullEncoder = () => Uint8Array;
  export type BooleanEncoder = (data: boolean) => Uint8Array;
  export type NumberEncoder = (data: number) => Uint8Array;
  export type StringEncoder = (data: string) => Uint8Array;
  export type ArrayEncoder = (data: unknown[]) => Uint8Array;
  export type HashEncoder = (data: Record<string, unknown>) => Uint8Array;
}

export default Encoder;
