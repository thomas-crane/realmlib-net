import { Writer } from '../writer';
import { Reader } from '../reader';
import { DataPacket } from '../packet';

export class GroundTileData implements DataPacket {

  /**
   * The X coordinate of this tile.
   */
  x: number;
  /**
   * The Y coordinate of this tile.
   */
  y: number;
  /**
   * The tile type of this tile.
   */
  type: number;

  read(reader: Reader): void {
    this.x = reader.readShort();
    this.y = reader.readShort();
    this.type = reader.readUnsignedShort();
  }

  write(writer: Writer): void {
    writer.writeShort(this.x);
    writer.writeShort(this.y);
    writer.writeUnsignedShort(this.type);
  }
}
