import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';
import { Point } from '../../data/world-pos-data';

/**
 * Sent when the player shoots a projectile.
 */
export class PlayerShootPacket implements Packet {

  type = PacketType.PLAYERSHOOT;
  propagate = true;

  //#region packet-specific members
  /**
   * The current client time.
   */
  time: number;
  /**
   * The id of the bullet which was fired.
   */
  bulletId: number;
  /**
   * The item id of the weapon used to fire the projectile.
   */
  containerType: number;
  /**
   * The position at which the projectile was fired.
   */
  startingPos: Point;
  /**
   * The angle at which the projectile was fired.
   */
  angle: number;
  //#endregion

  write(writer: Writer): void {
    writer.writeInt32(this.time);
    writer.writeByte(this.bulletId);
    writer.writeShort(this.containerType);
    this.startingPos.write(writer);
    writer.writeFloat(this.angle);
  }

  read(reader: Reader): void {
    this.time = reader.readInt32();
    this.bulletId = reader.readByte();
    this.containerType = reader.readShort();
    this.startingPos = new Point();
    this.startingPos.read(reader);
    this.angle = reader.readFloat();
  }
}
