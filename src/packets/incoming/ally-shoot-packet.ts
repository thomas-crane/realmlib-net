import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received when another player shoots a projectile.
 */
export class AllyShootPacket implements Packet {

  readonly type = PacketType.ALLYSHOOT;

  //#region packet-specific members
  /**
   * The bullet id of the projectile which was produced.
   */
  bulletId: number;
  /**
   * The object id of the player who fired the projectile.
   */
  ownerId: number;
  /**
   * The item id of the weapon used to fire the projectile.
   */
  containerType: number;
  /**
   * The angle at which the projectile was fired.
   */
  angle: number;
  //#endregion

  constructor() {
    this.bulletId = 0;
    this.ownerId = 0;
    this.containerType = 0;
    this.angle = 0;
  }

  read(reader: Reader): void {
    this.bulletId = reader.readUnsignedByte();
    this.ownerId = reader.readInt32();
    this.containerType = reader.readShort();
    this.angle = reader.readFloat();
  }

  write(writer: Writer): void {
    writer.writeUnsignedByte(this.bulletId);
    writer.writeInt32(this.ownerId);
    writer.writeShort(this.containerType);
    writer.writeFloat(this.angle);
  }
}
