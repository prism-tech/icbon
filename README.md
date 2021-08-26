[![icbon Logo](https://i.prism.md/2fa13e17-fab3-4408-8165-7be13f884acf.png)](https://github.com/prism-tech/icbon)

_**[Internet Compressed Binary Object Notation](https://github.com/prism-tech/icbon)**_ is a compact data interchange binary serialization format developed and designed for _**[Internet Compressed Binary Protocol](https://github.com/prism-tech/icbp)**_. This library allows you to reduce the amount of transmitted data and to speed up client-server data transfer, especially with slow internet connection.
___

#### _Support:_
* _Google Chrome 7+_
* _Mozilla Firefox 11+_
* _Internet Explorer 10+_
* _Microsoft Edge 12+_
* _Opera 12.1+_
* _Apple Safari 5.1+_
* _Node.JS 8.10.9+_
___

#### _Installation:_
```shell script
$ npm install icbon
```
___

#### _Documentation:_
```typescript
function compress(data: unknown): Uint8Array;
```
Serializes JSON RFC8259 compatible _`data`_ and compresses resulting buffer using deflate algorithm.

```typescript
function concat(data: Uint8Array[]): Uint8Array;
```
Sequentially concatenates each buffer in _`data`_ array into resulting buffer.

```typescript
function decompress(data: Uint8Array, offset: number = 0): unknown;
```
Decompresses _`data`_ buffer using inflate algorithm and deserializes resulting buffer to JSON RFC8259 compatible value starting from the specified _`offset`_.

```typescript
function deserialize(data: Uint8Array, offset: number = 0): unknown;
```
Deserializes _`data`_ buffer to JSON RFC8259 compatible value starting from the specified _`offset`_.

```typescript
function serialize(data: unknown): Uint8Array;
```
Serializes JSON RFC8259 compatible _`data`_ to resulting buffer.

```typescript
class Decoder {
  new(data: Uint8Array, offset: number = 0): this;
  any(): unknown;
  number(): number;
  string(): string;
  array(): unknown[];
  hash(): Record<string, unknown>;
}
```
Deserializes icbon _`data`_ buffer starting from the specified _`offset`_ to any JSON RFC8259 compatible type listed in the class interface.
Calling each class method shifts offset to the next byte after read buffer segment.

```typescript
class Encoder {
  new(): this;
  any(data: unknown): Uint8Array;
  null(): Uint8Array;
  boolean(data: boolean): Uint8Array;
  number(data: number): Uint8Array;
  string(data: string): Uint8Array;
  array(data: unknown[]): Uint8Array;
  hash(data: Record<string, unknown>): Uint8Array;
}
```
Serializes any JSON RFC8259 compatible type listed in the class interface to icbon buffer.

```typescript
class DecodeError {
  new(message?: string): this;
}
```
Error type which can be thrown during deserialization process.

```typescript
class EncodeError {
  new(message?: string): this;
}
```
Error type which can be thrown during serialization process.
___

#### _Usage examples:_
```typescript
import { compress, serialize } from 'icbon';

const response: Response = await fetch('https://random-data-api.com/api/users/random_user');
const text: string = await response.text();
const object: unknown = await response.json();
const serializedBuffer: Uint8Array = serialize(object);
const compressedBuffer: Uint8Array = compress(object);

console.log(`text json: ${ text.length * 2 } bytes`);
console.log(`serialized icbon: ${ serializedBuffer.length } bytes`);
console.log(`compressed icbon: ${ compressedBuffer.length } bytes`);
```

```typescript
// client
import { compress } from 'icbon';

const response: Response = await fetch('https://random-data-api.com/api/users/random_user');
const data: unknown = await response.json();

fetch(`http://example.com/endpoint`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-icbon-compressed' },
  body: compress(data),
});

// server
import { IncomingMessage, Server, ServerResponse } from 'http';
import { decompress } from 'icbon';

const server: Server = new Server();

server.on('request', (request: IncomingMessage, response: ServerResponse): void => {
  const chunks: Buffer[] = [];

  request.on('data', (chunk: Buffer): void => {
    chunks.push(chunk);
  });

  request.on('end', (): void => {
    const buffer: Buffer = Buffer.concat(chunks);
    const decompressedIcbon: Uint8Array = decompress(buffer);

    console.log(decompressedIcbon);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(decompressedIcbon));
  });
});

server.listen(8080, '0.0.0.0');
```

```typescript
import { concat, Decoder, Encoder } from 'icbon';

// Custom packet serialization
const encoder: Encoder = new Encoder();
const signature: Uint8Array = new Uint8Array([ 0x4C, 0xAA ]);
const status: Uint8Array = encoder.number(200);
const method: Uint8Array = encoder.string('POST');
const headers: Uint8Array = encoder.hash({ 'Random-Header': 'RandomValue' });
const body: Uint8Array = encoder.any([ { foo: 'bar', array: [ 100, 200, false ] } ]);
const packet: Uint8Array = concat([ signature, status, method, headers, body ]);

// Custom packet deserialization
if (packet[0] !== 0x4C || packet[1] !== 0xAA) {
  throw new Error('Wrong signature');
}

const decoder: Decoder = new Decoder(packet, 2);

console.log(`Status: ${ decoder.number() }`);
console.log(`Method: ${ decoder.string() }`);
console.log(`Headers: ${ decoder.hash() }`);
console.log(`Body: ${ decoder.any() }`);
```
___

#### _See also:_
* _**[icbp](https://github.com/prism-tech/icbp)**_ — _**Internet Compressed Binary Protocol Implementation for Node.JS**_
* _**[express-icbon](https://github.com/prism-tech/express-icbon)**_ — _**[express](https://github.com/expressjs/express) body-parser for [icbon](https://github.com/prism-tech/icbon) format**_
