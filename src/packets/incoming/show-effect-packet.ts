import { WorldPosData } from '../../data/world-pos-data';
import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received to tell the player to display an effect such as an AOE grenade.
 */
export class ShowEffectPacket implements Packet {

  type = PacketType.SHOWEFFECT;
  propagate = true;

  //#region packet-specific members
  /**
   * The type of effect to display.
   */
  effectType: number;
  /**
   * > Unknown. Probably the start position of the effect.
   */
  targetObjectId: number;
  /**
   * > Unknown. Probably the end position of the effect.
   */
  pos1: WorldPosData;
  /**
   * > Unknown.
   */
  pos2: WorldPosData;
  /**
   * The color of the effect.
   */
  color: number;
  /**
   * The duration of the effect.
   */
  duration: number;
  //#endregion

  read(reader: Reader): void {
    this.effectType = reader.readUnsignedByte();
    this.targetObjectId = reader.readInt32();
    this.pos1 = new WorldPosData();
    this.pos1.read(reader);
    this.pos2 = new WorldPosData();
    this.pos2.read(reader);
    this.color = reader.readInt32();
    this.duration = reader.readFloat();
  }

  write(writer: Writer): void {
    writer.writeUnsignedByte(this.effectType);
    writer.writeInt32(this.targetObjectId);
    this.pos1.write(writer);
    this.pos2.write(writer);
    writer.writeInt32(this.color);
    writer.writeFloat(this.duration);
  }
}
