import test, { ExecutionContext } from 'ava';
import { BufferReader } from './buffer-reader';

function read(t: ExecutionContext, method: (...args: any[]) => any, initial: number[] | string, expected: any) {
  let buffer: Buffer;
  if (typeof initial === 'string') {
    buffer = Buffer.from(initial, 'utf8');
  } else {
    buffer = Buffer.from(initial);
  }
  const reader = new BufferReader(buffer);
  const result = method.apply(reader);
  t.deepEqual(result, expected);
}

test('readInt32', read, BufferReader.prototype.readInt32, [0x0, 0x0, 0x0, 0x34], 52);
test('readUInt32', read, BufferReader.prototype.readUInt32, [0x0, 0x0, 0x1f, 0x88], 8072);

test('readShort', read, BufferReader.prototype.readShort, [0x2, 0xfa], 762);
test('readUnsignedShort', read, BufferReader.prototype.readUnsignedShort, [0x0, 0x1], 1);

test('readByte', read, BufferReader.prototype.readByte, [0xa], 0xa);
test('readUnsignedByte', read, BufferReader.prototype.readUnsignedByte, [0xff], 0xff);

test('readBoolean is true if non zero', read, BufferReader.prototype.readBoolean, [0xc], true);
test('readBoolean is false if zero', read, BufferReader.prototype.readBoolean, [0x0], false);

test('readFloat', read, BufferReader.prototype.readFloat, [0x40, 0xc7, 0x6d, 0xb1], 6.232140064239502);

test(
  'readByteArray',
  read,
  BufferReader.prototype.readByteArray,
  [0x0, 0x4, 0x1, 0x1d, 0x1e, 0x1f],
  [0x1, 0x1d, 0x1e, 0x1f],
);

test('readString', read, BufferReader.prototype.readString, [0x0, 0x5, 0x48, 0x65, 0x6c, 0x6c, 0x6f], 'Hello');
test('readStringUTF32',
  read,
  BufferReader.prototype.readStringUTF32,
  [0x0, 0x0, 0x0, 0x5, 0x57, 0x6f, 0x72, 0x6c, 0x64],
  'World',
);
