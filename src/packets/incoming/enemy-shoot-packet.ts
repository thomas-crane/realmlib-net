import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';
import { WorldPosData } from '../../data/world-pos-data';

/**
 * Received when a visible enemy shoots a projectile.
 */
export class EnemyShootPacket implements Packet {

  type = PacketType.ENEMYSHOOT;
  propagate = true;

  //#region packet-specific members
  /**
   * The id of the bullet which was fired.
   */
  bulletId: number;
  /**
   * The object id of the enemy which fired the projectile.
   */
  ownerId: number;
  /**
   * The local identifier of the projectile.
   * @see `ProjectileInfo.id`
   */
  bulletType: number;
  /**
   * The position at which the projectile was fired.
   */
  startingPos: WorldPosData;
  /**
   * The angle at which the projectile was fired.
   */
  angle: number;
  /**
   * The damage which the projectile will cause.
   */
  damage: number;
  /**
   * The number of projeciles fired.
   */
  numShots: number;
  /**
   * The angle in degrees between the projectiles if `numShots > 1`.
   */
  angleInc: number;
  //#endregion

  read(reader: Reader): void {
    this.bulletId = reader.readUnsignedByte();
    this.ownerId = reader.readInt32();
    this.bulletType = reader.readUnsignedByte();
    this.startingPos = new WorldPosData();
    this.startingPos.read(reader);
    this.angle = reader.readFloat();
    this.damage = reader.readShort();
    if (reader.index < reader.buffer.length) {
      this.numShots = reader.readUnsignedByte();
      this.angleInc = reader.readFloat();
    } else {
      this.numShots = 1;
      this.angleInc = 0;
    }
  }

  write(writer: Writer): void {
    writer.writeUnsignedByte(this.bulletId);
    writer.writeInt32(this.ownerId);
    writer.writeUnsignedByte(this.bulletType);
    this.startingPos.write(writer);
    writer.writeFloat(this.angle);
    writer.writeShort(this.damage);
    if (this.numShots !== 1) {
      writer.writeUnsignedByte(this.numShots);
      writer.writeFloat(this.angleInc);
    }
  }
}
