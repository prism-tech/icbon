export function concat(data: Uint8Array[]): Uint8Array {
  let offset: number = 0;
  let length: number = 0;

  for (let i: number = 0; i < data.length; i++) {
    length += data[i].length;
  }

  const response: Uint8Array = new Uint8Array(length);

  for (let i: number = 0; i < data.length; i++) {
    const buffer: Uint8Array = new Uint8Array(data[i]);

    for (let j: number = 0; j < buffer.byteLength; j++, offset++) {
      response[offset] = buffer[j];
    }
  }

  return response;
}

export default concat;
