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

interface ReadDescriptor {
  data: Uint8Array;
  offset: number;
}

function readNumber(descriptor: ReadDescriptor): number {
  switch (descriptor.data[descriptor.offset]) {
    case ICBON_TYPE_INT8:
      descriptor.offset += 2;
      return new Int8Array(descriptor.data.buffer.slice(descriptor.offset - 1, descriptor.offset))[0];
    case ICBON_TYPE_UINT8:
      descriptor.offset += 2;
      return new Uint8Array(descriptor.data.buffer.slice(descriptor.offset - 1, descriptor.offset))[0];
    case ICBON_TYPE_INT16:
      descriptor.offset += 3;
      return new Int16Array(descriptor.data.buffer.slice(descriptor.offset - 2, descriptor.offset))[0];
    case ICBON_TYPE_UINT16:
      descriptor.offset += 3;
      return new Uint16Array(descriptor.data.buffer.slice(descriptor.offset - 2, descriptor.offset))[0];
    case ICBON_TYPE_INT32:
      descriptor.offset += 5;
      return new Int32Array(descriptor.data.buffer.slice(descriptor.offset - 4, descriptor.offset))[0];
    case ICBON_TYPE_UINT32:
      descriptor.offset += 5;
      return new Uint32Array(descriptor.data.buffer.slice(descriptor.offset - 4, descriptor.offset))[0];
    case ICBON_TYPE_FLOAT32:
      descriptor.offset += 5;
      return new Float32Array(descriptor.data.buffer.slice(descriptor.offset - 4, descriptor.offset))[0];
    case ICBON_TYPE_FLOAT64:
      descriptor.offset += 9;
      return new Float32Array(descriptor.data.buffer.slice(descriptor.offset - 8, descriptor.offset))[0];
    default:
      throw new SyntaxError();
  }
}

function readString(descriptor: ReadDescriptor): string {
  switch (descriptor.data[descriptor.offset]) {
    case ICBON_TYPE_ASCII:
    {
      descriptor.offset++;
      const length: number = readNumber(descriptor);

      descriptor.offset += length;
      return Array.prototype.map.call(
        new Uint8Array(descriptor.data.buffer.slice(descriptor.offset - length, descriptor.offset)),
        (charCode: number): string => {
          return String.fromCharCode(charCode);
        },
      ).join('');
    }
    case ICBON_TYPE_UNICODE:
    {
      descriptor.offset++;
      const length: number = readNumber(descriptor) * 2;

      descriptor.offset += length;
      return Array.prototype.map.call(
        new Uint16Array(descriptor.data.buffer.slice(descriptor.offset - length, descriptor.offset)),
        (charCode: number): string => {
          return String.fromCharCode(charCode);
        },
      ).join('');
    }
    default:
      throw new SyntaxError();
  }
}

function readArray(descriptor: ReadDescriptor): unknown[] {
  if (descriptor.data[descriptor.offset] === ICBON_TYPE_ARRAY) {
    descriptor.offset++;
    let array: unknown[] = [];
    const length: number = readNumber(descriptor);

    for (let i: number = 0; i < length; i++) {
      array.push(readAny(descriptor));
    }

    return array;
  }

  throw new SyntaxError();
}

function readHash(descriptor: ReadDescriptor): Record<string, unknown> {
  if (descriptor.data[descriptor.offset] === ICBON_TYPE_HASH) {
    descriptor.offset++;
    let hash: Record<string, unknown> = {};
    const length: number = readNumber(descriptor);

    for (let i: number = 0; i < length; i++) {
      const name: string = readString(descriptor);
      hash[name] = readAny(descriptor);
    }

    return hash;
  }

  throw new SyntaxError();
}

function readAny(descriptor: ReadDescriptor): unknown {
  switch (descriptor.data[descriptor.offset]) {
    case ICBON_TYPE_NULL:
      descriptor.offset++;
      return null;
    case ICBON_TYPE_BOOLEAN:
      descriptor.offset += 2;
      return Boolean(descriptor.data[descriptor.offset - 1]);
    case ICBON_TYPE_INT8:
    case ICBON_TYPE_UINT8:
    case ICBON_TYPE_INT16:
    case ICBON_TYPE_UINT16:
    case ICBON_TYPE_INT32:
    case ICBON_TYPE_UINT32:
    case ICBON_TYPE_FLOAT32:
    case ICBON_TYPE_FLOAT64:
      return readNumber(descriptor);
    case ICBON_TYPE_ASCII:
    case ICBON_TYPE_UNICODE:
      return readString(descriptor);
    case ICBON_TYPE_ARRAY:
      return readArray(descriptor);
    case ICBON_TYPE_HASH:
      return readHash(descriptor);
    default:
      throw new SyntaxError();
  }
}

export function unpack(buffer: ArrayBuffer): unknown {
  const descriptor: ReadDescriptor = { data: new Uint8Array(buffer), offset: 0 };
  return readAny(descriptor);
}

export default unpack;
