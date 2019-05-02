import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';
import { WorldPosData } from '../../data/world-pos-data';

/**
 * Received when an AoE grenade has hit the ground.
 */
export class AoePacket implements Packet {

  type = PacketType.AOE;
  propagate = true;

  //#region packet-specific members
  /**
   * The position which the grenade landed at.
   */
  pos: WorldPosData;
  /**
   * The radius of the grenades area of effect, in game tiles.
   */
  radius: number;
  /**
   * The damage dealt by the grenade.
   */
  damage: number;
  /**
   * The condition effect applied by the grenade.
   */
  effect: number;
  /**
   * The duration of the effect applied.
   * @see `AoePacket.effect`.
   */
  duration: number;
  /**
   * > Unknown.
   */
  origType: number;
  /**
   * The color of the grenade's explosion particles.
   * > The encoding of the color is unknown.
   */
  color: number;
  /**
   * Whether or not the damage of this grenade pierces armor.
   */
  armorPiercing: boolean;
  //#endregion

  read(reader: Reader): void {
    this.pos = new WorldPosData();
    this.pos.read(reader);
    this.radius = reader.readFloat();
    this.damage = reader.readUnsignedShort();
    this.effect = reader.readUnsignedByte();
    this.duration = reader.readFloat();
    this.origType = reader.readUnsignedShort();
    this.color = reader.readInt32();
    this.armorPiercing = reader.readBoolean();
  }

  write(writer: Writer): void {
    this.pos.write(writer);
    writer.writeFloat(this.radius);
    writer.writeUnsignedShort(this.damage);
    writer.writeUnsignedByte(this.effect);
    writer.writeFloat(this.duration);
    writer.writeUnsignedShort(this.origType);
    writer.writeInt32(this.color);
    writer.writeBoolean(this.armorPiercing);
  }
}
