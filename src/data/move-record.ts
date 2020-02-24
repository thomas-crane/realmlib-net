import { DataPacket } from '../packet';
import { Reader } from '../reader';
import { Writer } from '../writer';

export class MoveRecord implements DataPacket {

  /**
   * The client time of this move record.
   */
  time: number;
  /**
   * The X coordinate of this move record.
   */
  x: number;
  /**
   * The Y coordinate of this move record.
   */
  y: number;

  constructor() {
    this.time = 0;
    this.x = 0;
    this.y = 0;
  }

  read(reader: Reader): void {
    this.time = reader.readInt32();
    this.x = reader.readFloat();
    this.y = reader.readFloat();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.time);
    writer.writeFloat(this.x);
    writer.writeFloat(this.y);
  }

  clone(): MoveRecord {
    const clone = new MoveRecord();
    clone.time = this.time;
    clone.x = this.x;
    clone.y = this.y;
    return clone;
  }
}
