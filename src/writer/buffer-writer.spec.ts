import test, { ExecutionContext } from 'ava';
import { BufferWriter } from './buffer-writer';

function write(t: ExecutionContext, method: (...args: any[]) => any, args: any[], expected: number[]) {
  const writeBuffer = Buffer.alloc(expected.length);
  const expectedBuffer = Buffer.from(expected);
  const writer = new BufferWriter(writeBuffer);
  method.apply(writer, args);
  t.deepEqual(writeBuffer, expectedBuffer);
}

test('writeInt32', write, BufferWriter.prototype.writeInt32, [12], [0x0, 0x0, 0x0, 0xc]);
test('writeUInt32', write, BufferWriter.prototype.writeUInt32, [432], [0x0, 0x0, 0x1, 0xb0]);

test('writeShort', write, BufferWriter.prototype.writeShort, [376], [0x1, 0x78]);
test('writeUnsignedShort', write, BufferWriter.prototype.writeUnsignedShort, [31], [0x0, 0x1f]);

test('writeByte', write, BufferWriter.prototype.writeByte, [13], [0xd]);
test('writeUnsignedByte', write, BufferWriter.prototype.writeUnsignedByte, [255], [0xff]);

test('readBoolean writes 0x0 for false', write, BufferWriter.prototype.writeBoolean, [false], [0x0]);
test('readBoolean writes 0x1 for true', write, BufferWriter.prototype.writeBoolean, [true], [0x1]);

test('writeFloat', write, BufferWriter.prototype.writeFloat, [12.34], [0x41, 0x45, 0x70, 0xa4]);

test('writeByteArray', write, BufferWriter.prototype.writeByteArray, [[1, 2, 3, 4]], [0x0, 0x4, 0x1, 0x2, 0x3, 0x4]);

test('writeString', write, BufferWriter.prototype.writeString, ['Hello'], [0x0, 0x5, 0x48, 0x65, 0x6c, 0x6c, 0x6f]);
test(
  'writeStringUTF32',
  write,
  BufferWriter.prototype.writeStringUTF32,
  ['World'],
  [0x0, 0x0, 0x0, 0x5, 0x57, 0x6f, 0x72, 0x6c, 0x64],
);

test('bytesWritten returns the correct amount', (t) => {
  const writer = new BufferWriter(Buffer.alloc(256));
  writer.writeInt32(0); // 4 bytes.
  writer.writeShort(0); // 2 bytes.
  writer.writeBoolean(false); // 1 byte.
  t.is(writer.bytesWritten, 7);
});
