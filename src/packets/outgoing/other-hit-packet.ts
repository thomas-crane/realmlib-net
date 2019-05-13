import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Sent when an object or other player has been hit by an enemy projectile.
 */
export class OtherHitPacket implements Packet {

  type = PacketType.OTHERHIT;
  propagate = true;

  //#region packet-specific members
  /**
   * The current client time.
   */
  time: number;
  /**
   * The id of the bullet which hit the object.
   */
  bulletId: number;
  /**
   * The object id of player who fired the projectile which hit the object.
   */
  objectId: number;
  /**
   * The object id of the object which was hit.
   */
  targetId: number;
  //#endregion

  write(writer: Writer): void {
    writer.writeInt32(this.time);
    writer.writeUnsignedByte(this.bulletId);
    writer.writeInt32(this.objectId);
    writer.writeInt32(this.targetId);
  }

  read(reader: Reader): void {
    this.time = reader.readInt32();
    this.bulletId = reader.readUnsignedByte();
    this.objectId = reader.readInt32();
    this.targetId = reader.readInt32();
  }
}
