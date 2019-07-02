/**
 * A wrapper class which provides methods to
 * read data from the raw bytes of a buffer.
 */
export class Reader {

  /**
   * The default size when this reader is reset.
   */
  static readonly DEFAULT_SIZE: number = 4;
  /**
   * The current index of the buffer.
   */
  index: number;
  /**
   * The wrapped buffer.
   */
  buffer: Buffer;

  /**
   * The length of the buffer.
   */
  get length(): number {
    return this._length;
  }

  /**
   * The number of bytes between the end of the buffer and the current index.
   */
  get remaining(): number {
    return this._length - this.index;
  }

  private _length: number;

  /**
   * Creates a new `Reader` and initialises the
   * wrapped buffer to the given `size`.
   * @param size The size of the buffer.
   */
  constructor(size: number = Reader.DEFAULT_SIZE) {
    this.index = 0;
    this.buffer = Buffer.alloc(size);
    this._length = size;
  }

  /**
   * Reads a 4 byte integer from the buffer.
   */
  readInt32(): number {
    const result = this.buffer.readInt32BE(this.index);
    this.index += 4;
    return result;
  }

  /**
   * Reads a 4 byte unsigned integer from the buffer.
   */
  readUInt32(): number {
    const result = this.buffer.readUInt32BE(this.index);
    this.index += 4;
    return result;
  }

  /**
   * Reads a 2 byte integer from the buffer.
   */
  readShort(): number {
    const result = this.buffer.readInt16BE(this.index);
    this.index += 2;
    return result;
  }

  /**
   * Reads a 2 byte unsigned integer from the buffer.
   */
  readUnsignedShort(): number {
    const result = this.buffer.readUInt16BE(this.index);
    this.index += 2;
    return result;
  }
  /**
   * Writes a 2 byte unsigned integer to the buffer.
   * @param value The value to write.
   */

  /**
   * Reads a 1 byte integer from the buffer.
   */
  readByte(): number {
    const result = this.buffer.readInt8(this.index);
    this.index++;
    return result;
  }

  /**
   * Reads a 1 byte unsigned integer from the buffer.
   */
  readUnsignedByte(): number {
    const result = this.buffer.readUInt8(this.index);
    this.index++;
    return result;
  }
  /**
   * Writes a 1 byte unsigned integer to the buffer.
   * @param value The value to write.
   */

  /**
   * Reads a single byte from the buffer, returns `true` if the byte is `1` and `false` otherwise.
   */
  readBoolean(): boolean {
    const result = this.readByte();
    return result !== 0;
  }

  /**
   * Reads a 4 byte floating point number from the buffer.
   */
  readFloat(): number {
    const result = this.buffer.readFloatBE(this.index);
    this.index += 4;
    return result;
  }

  /**
   * Reads 2 bytes to get the length, then reads `length` bytes from the buffer.
   */
  readByteArray(): number[] {
    const arraylen = this.readShort();
    const result = new Array<number>(arraylen);
    for (let i = 0; i < arraylen; i++ , this.index++) {
      result[i] = this.buffer[this.index];
    }
    return result;
  }

  /**
   * Reads `size` bytes from the buffer.
   * @param size The number of bytes to read.
   */
  readBytes(size: number): number[] {
    const result = new Array<number>(size);
    for (let i = 0; i < size; i++ , this.index++) {
      result[i] = this.buffer[this.index];
    }
    return result;
  }

  /**
   * Reads 2 bytes to get the length, reads `length` bytes from the buffer, then converts
   * the result to a utf8 string.
   */
  readString(): string {
    const strlen = this.readShort();
    this.index += strlen;
    return this.buffer.slice(this.index - strlen, this.index).toString('utf8');
  }

  /**
   * The same as `readString()`, but reads 4 bytes for the length.
   */
  readStringUTF32(): string {
    const strlen = this.readInt32();
    this.index += strlen;
    return this.buffer.slice(this.index - strlen, this.index).toString('utf8');
  }

  /**
   * Changes the size of the buffer without affecting the contents.
   * @param newSize The new size of the buffer.
   */
  resizeBuffer(newSize: number): void {
    this._length = newSize;
    if (this.buffer.length < newSize) {
      this.buffer = Buffer.concat([this.buffer, Buffer.alloc(newSize - this.buffer.length)], newSize);
    }
  }

  /**
   * Resets the `bufferIndex` to `0` and allocates a fresh buffer of length `DEFAULT_SIZE` to the underlying buffer.
   */
  reset(): void {
    this.index = 0;
    this.buffer = Buffer.alloc(Reader.DEFAULT_SIZE);
    this._length = Reader.DEFAULT_SIZE;
  }
}
