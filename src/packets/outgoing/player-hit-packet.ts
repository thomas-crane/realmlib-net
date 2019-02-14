import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Sent when the player is hit.
 */
export class PlayerHitPacket implements Packet {

  type = PacketType.PLAYERHIT;
  propagate = true;

  //#region packet-specific members
  /**
   * The id of the bullet which hit the player.
   */
  bulletId: number;
  /**
   * The object id of the enemy that hit the player.
   */
  objectId: number;
  //#endregion

  write(writer: Writer): void {
    writer.writeUnsignedByte(this.bulletId);
    writer.writeInt32(this.objectId);
  }

  read(reader: Reader): void {
    this.bulletId = reader.readUnsignedByte();
    this.objectId = reader.readInt32();
  }
}
