import { Writer } from '.';

/**
 * A writer which uses a `Buffer` as a sink.
 */
export class BufferWriter implements Writer {

  get bytesWritten(): number {
    return this.index;
  }

  /**
   * The current write position.
   */
  private index: number;
  /**
   * The sink of this writer.
   */
  private readonly buffer: Buffer;

  /**
   * Creates a new `BufferWriter` which will use the given `Buffer` as a sink.
   * @param buffer The buffer to use as a sink.
   */
  constructor(buffer: Buffer) {
    this.index = 0;
    this.buffer = buffer;
  }

  writeInt32(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    this.index = this.buffer.writeInt32BE(value, this.index);
  }

  writeUInt32(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    this.index = this.buffer.writeUInt32BE(value, this.index);
  }

  writeShort(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    this.index = this.buffer.writeInt16BE(value, this.index);
  }

  writeUnsignedShort(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    this.index = this.buffer.writeUInt16BE(value, this.index);
  }

  writeByte(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    this.index = this.buffer.writeInt8(value, this.index);
  }

  writeUnsignedByte(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    this.index = this.buffer.writeUInt8(value, this.index);
  }

  writeBoolean(value: boolean) {
    if (typeof value !== 'boolean') {
      value = false;
    }
    const byteValue = value ? 1 : 0;
    this.writeByte(byteValue);
  }

  writeFloat(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    this.index = this.buffer.writeFloatBE(value, this.index);
  }

  writeByteArray(value: number[]) {
    if (!Array.isArray(value)) {
      this.writeShort(0);
      return;
    }
    this.writeShort(value.length);
    for (const byte of value) {
      this.buffer[this.index++] = byte;
    }
  }

  writeString(value: string) {
    if (typeof value !== 'string') {
      this.writeShort(0);
      return;
    }
    this.writeShort(value.length);
    this.index += this.buffer.write(value, this.index, value.length, 'utf8');
  }

  writeStringUTF32(value: string) {
    if (typeof value !== 'string') {
      this.writeInt32(0);
      return;
    }
    this.writeInt32(value.length);
    this.index += this.buffer.write(value, this.index, value.length, 'utf8');
  }
}
