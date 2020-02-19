import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent when an enemy has been hit by the player.
 */
export class EnemyHitPacket implements Packet {

  readonly type = PacketType.ENEMYHIT;
  propagate = true;

  //#region packet-specific members
  /**
   * The current client time.
   */
  time: number;
  /**
   * The id of the bullet which hit the enemy.
   */
  bulletId: number;
  /**
   * The object id of the enemy which was hit.
   */
  targetId: number;
  /**
   * Whether or not the projectile will kill the enemy.
   */
  kill: boolean;
  //#endregion

  constructor() {
    this.time = 0;
    this.bulletId = 0;
    this.targetId = 0;
    this.kill = false;
  }

  write(writer: Writer): void {
    writer.writeInt32(this.time);
    writer.writeUnsignedByte(this.bulletId);
    writer.writeInt32(this.targetId);
    writer.writeBoolean(this.kill);
  }

  read(reader: Reader): void {
    this.time = reader.readInt32();
    this.bulletId = reader.readUnsignedByte();
    this.targetId = reader.readInt32();
    this.kill = reader.readBoolean();
  }
}
