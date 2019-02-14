import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';
import { Point } from '../../data/world-pos-data';

/**
 * Received when an entity has moved to a new position.
 */
export class GotoPacket implements Packet {

  type = PacketType.GOTO;
  propagate = true;

  //#region packet-specific members
  /**
   * The object id of the entity which moved.
   */
  objectId: number;
  /**
   * The new position of the entity.
   */
  position: Point;
  //#endregion

  read(reader: Reader): void {
    this.objectId = reader.readInt32();
    this.position = new Point();
    this.position.read(reader);
  }

  write(writer: Writer): void {
    writer.writeInt32(this.objectId);
    this.position.write(writer);
  }
}
