/**
 * A structured way to access raw bytes from a data source.
 */
export interface Reader {
  /**
   * Reads a 4 byte integer.
   */
  readInt32(): number;

  /**
   * Reads a 4 byte unsigned integer.
   */
  readUInt32(): number;

  /**
   * Reads a 2 byte integer.
   */
  readShort(): number;

  /**
   * Reads a 2 byte unsigned integer.
   */
  readUnsignedShort(): number;

  /**
   * Reads a 1 byte integer.
   */
  readByte(): number;

  /**
   * Reads a 1 byte unsigned integer.
   */
  readUnsignedByte(): number;

  /**
   * Reads a single byte, returns `true` if the byte is `1` and `false` otherwise.
   */
  readBoolean(): boolean;

  /**
   * Reads a 4 byte floating point number.
   */
  readFloat(): number;

  /**
   * Reads a byte array.
   */
  readByteArray(): number[];

  /**
   * Reads `size` bytes from the buffer.
   * @param size The number of bytes to read.
   */
  readBytes(size: number): number[];

  /**
   * Reads a UTF8 encoded string.
   */
  readString(): string;

  /**
   * Reads a UTF8 encoded string with a large length.
   */
  readStringUTF32(): string;
}
