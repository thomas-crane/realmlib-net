import { Reader } from '.';

/**
 * A reader which provides a view of a `Buffer`.
 */
export class BufferReader implements Reader {

  /**
   * The current index of the buffer.
   */
  private index: number;
  /**
   * The wrapped buffer.
   */
  private readonly buffer: Buffer;

  /**
   * Creates a new `BufferReader` which provides a view of the given `Buffer`
   * @param buffer The buffer to provide a view of.
   */
  constructor(buffer: Buffer) {
    this.index = 0;
    this.buffer = buffer;
  }

  readInt32() {
    const result = this.buffer.readInt32BE(this.index);
    this.index += 4;
    return result;
  }

  readUInt32() {
    const result = this.buffer.readUInt32BE(this.index);
    this.index += 4;
    return result;
  }

  readShort() {
    const result = this.buffer.readInt16BE(this.index);
    this.index += 2;
    return result;
  }

  readUnsignedShort() {
    const result = this.buffer.readUInt16BE(this.index);
    this.index += 2;
    return result;
  }

  readByte() {
    const result = this.buffer.readInt8(this.index);
    this.index++;
    return result;
  }

  readUnsignedByte() {
    const result = this.buffer.readUInt8(this.index);
    this.index++;
    return result;
  }

  readBoolean() {
    const result = this.readByte();
    return result !== 0;
  }

  readFloat() {
    const result = this.buffer.readFloatBE(this.index);
    this.index += 4;
    return result;
  }

  readByteArray() {
    const arraylen = this.readShort();
    const result: number[] = [];
    for (let i = 0; i < arraylen; i++ , this.index++) {
      result[i] = this.buffer[this.index];
    }
    return result;
  }

  readBytes(size: number) {
    const result: number[] = [];
    for (let i = 0; i < size; i++ , this.index++) {
      result[i] = this.buffer[this.index];
    }
    return result;
  }

  readString() {
    const strlen = this.readShort();
    this.index += strlen;
    return this.buffer.slice(this.index - strlen, this.index).toString('utf8');
  }

  readStringUTF32() {
    const strlen = this.readInt32();
    this.index += strlen;
    return this.buffer.slice(this.index - strlen, this.index).toString('utf8');
  }
}
