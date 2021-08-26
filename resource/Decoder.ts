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
import { uint8tohex } from './uint8tohex';
import { DecodeError } from './DecodeError';

export class Decoder {

  private readonly data: Uint8Array;
  private offset: number;

  public constructor(data: Uint8Array, offset: number = 0) {
    this.data = data;
    this.offset = offset;
  }

  public readonly any: Decoder.AnyDecoder = (): unknown => {
    switch (this.data[this.offset]) {
      case ICBON_TYPE_NULL:
        this.offset++;
        return null;
      case ICBON_TYPE_BOOLEAN:
        this.offset += 2;
        return Boolean(this.data[this.offset - 1]);
      case ICBON_TYPE_INT8:
      case ICBON_TYPE_UINT8:
      case ICBON_TYPE_INT16:
      case ICBON_TYPE_UINT16:
      case ICBON_TYPE_INT32:
      case ICBON_TYPE_UINT32:
      case ICBON_TYPE_FLOAT32:
      case ICBON_TYPE_FLOAT64:
        return this.number();
      case ICBON_TYPE_ASCII:
      case ICBON_TYPE_UNICODE:
        return this.string();
      case ICBON_TYPE_ARRAY:
        return this.array();
      case ICBON_TYPE_HASH:
        return this.hash();
      default:
        throw new DecodeError(`Invalid data type \x1b[1m${ uint8tohex(this.data[this.offset]) }\x1b[0m`);
    }
  };

  public readonly number: Decoder.NumberDecoder = (): number => {
    switch (this.data[this.offset]) {
      case ICBON_TYPE_INT8:
        this.offset += 2;
        return new Int8Array(this.data.buffer.slice(this.offset - 1, this.offset))[0];
      case ICBON_TYPE_UINT8:
        this.offset += 2;
        return new Uint8Array(this.data.buffer.slice(this.offset - 1, this.offset))[0];
      case ICBON_TYPE_INT16:
        this.offset += 3;
        return new Int16Array(this.data.buffer.slice(this.offset - 2, this.offset))[0];
      case ICBON_TYPE_UINT16:
        this.offset += 3;
        return new Uint16Array(this.data.buffer.slice(this.offset - 2, this.offset))[0];
      case ICBON_TYPE_INT32:
        this.offset += 5;
        return new Int32Array(this.data.buffer.slice(this.offset - 4, this.offset))[0];
      case ICBON_TYPE_UINT32:
        this.offset += 5;
        return new Uint32Array(this.data.buffer.slice(this.offset - 4, this.offset))[0];
      case ICBON_TYPE_FLOAT32:
        this.offset += 5;
        return new Float32Array(this.data.buffer.slice(this.offset - 4, this.offset))[0];
      case ICBON_TYPE_FLOAT64:
        this.offset += 9;
        return new Float64Array(this.data.buffer.slice(this.offset - 8, this.offset))[0];
      default:
        throw new DecodeError(`Invalid number type \x1b[1m${ uint8tohex(this.data[this.offset]) }\x1b[0m`);
    }
  };

  public readonly string: Decoder.StringDecoder = (): string => {
    switch (this.data[this.offset]) {
      case ICBON_TYPE_ASCII:
      {
        this.offset++;
        const length: number = this.number();

        this.offset += length;
        return Array.prototype.map.call(
          new Uint8Array(this.data.buffer.slice(this.offset - length, this.offset)),
          (charCode: number): string => {
            return String.fromCharCode(charCode);
          },
        ).join('');
      }
      case ICBON_TYPE_UNICODE:
      {
        this.offset++;
        const length: number = this.number() * 2;

        this.offset += length;
        return Array.prototype.map.call(
          new Uint16Array(this.data.buffer.slice(this.offset - length, this.offset)),
          (charCode: number): string => {
            return String.fromCharCode(charCode);
          },
        ).join('');
      }
      default:
        throw new DecodeError(`Invalid string type \x1b[1m${ uint8tohex(this.data[this.offset]) }\x1b[0m`);
    }
  };

  public readonly array: Decoder.ArrayDecoder = (): unknown[] => {
    if (this.data[this.offset] === ICBON_TYPE_ARRAY) {
      this.offset++;
      let array: unknown[] = [];
      const length: number = this.number();

      for (let i: number = 0; i < length; i++) {
        array.push(this.any());
      }

      return array;
    }

    throw new DecodeError(`Invalid array type \x1b[1m${ uint8tohex(this.data[this.offset]) }\x1b[0m`);
  };

  public readonly hash: Decoder.HashDecoder = (): Record<string, unknown> => {
    if (this.data[this.offset] === ICBON_TYPE_HASH) {
      this.offset++;
      let hash: Record<string, unknown> = {};
      const length: number = this.number();

      for (let i: number = 0; i < length; i++) {
        const name: string = this.string();
        hash[name] = this.any();
      }

      return hash;
    }

    throw new DecodeError(`Invalid object type \x1b[1m${ uint8tohex(this.data[this.offset]) }\x1b[0m`);
  };

}

export namespace Decoder {
  export type AnyDecoder = () => unknown;
  export type NumberDecoder = () => number;
  export type StringDecoder = () => string;
  export type ArrayDecoder = () => unknown[];
  export type HashDecoder = () => Record<string, unknown>;
}

export default Decoder;
