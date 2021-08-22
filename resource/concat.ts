export function concat(data: ArrayBuffer[]): ArrayBuffer {
  const length: number = data.reduce((length: number, buffer: ArrayBuffer): number => {
    return length + buffer.byteLength;
  }, 0);

  const response: Uint8Array = new Uint8Array(length);

  data.reduce((offset: number, buffer: ArrayBuffer): number => {
    response.set(new Uint8Array(buffer), offset);
    return offset + buffer.byteLength;
  }, 0);

  return response.buffer;
}

export default concat;
