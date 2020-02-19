/**
 * A way to write structured data to a raw byte sink.
 */
export interface Writer {
  /**
   * The total number of bytes which have been written to the sink.
   */
  bytesWritten: number;
  /**
   * Writes a 4 byte integer to the sink.
   * @param value The value to write.
   */
  writeInt32(value: number): void;

  /**
   * Writes a 4 byte unsigned integer to the sink.
   * @param value The value to write.
   */
  writeUInt32(value: number): void;

  /**
   * Writes a 2 byte integer to the sink.
   * @param value The value to write.
   */
  writeShort(value: number): void;

  /**
   * Writes a 2 byte unsigned integer to the sink.
   * @param value The value to write.
   */
  writeUnsignedShort(value: number): void;

  /**
   * Writes a 1 byte integer to the sink.
   * @param value The value to write.
   */
  writeByte(value: number): void;

  /**
   * Writes a 1 byte unsigned integer to the sink.
   * @param value The value to write.
   */
  writeUnsignedByte(value: number): void;

  /**
   * Writes a single byte representation of a boolean to the sink.
   * @param value The value to write.
   */
  writeBoolean(value: boolean): void;

  /**
   * Writes a 4 byte floating point value to the sink.
   * @param value The value to write.
   */
  writeFloat(value: number): void;

  /**
   * Writes an array of bytes to the sink.
   * @param value The value to write.
   */
  writeByteArray(value: number[]): void;

  /**
   * Writes the string as UTF8 encoded bytes to the sink.
   * @param value The value to write.
   */
  writeString(value: string): void;

  /**
   * Writes the string as UTF8 encoded bytes with a large length to the sink.
   * @param value The value to write.
   */
  writeStringUTF32(value: string): void;
}
