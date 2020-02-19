import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent when the player is hit.
 */
export class PlayerHitPacket implements Packet {

  readonly type = PacketType.PLAYERHIT;
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

  constructor() {
    this.bulletId = 0;
    this.objectId = 0;
  }

  write(writer: Writer): void {
    writer.writeUnsignedByte(this.bulletId);
    writer.writeInt32(this.objectId);
  }

  read(reader: Reader): void {
    this.bulletId = reader.readUnsignedByte();
    this.objectId = reader.readInt32();
  }
}
