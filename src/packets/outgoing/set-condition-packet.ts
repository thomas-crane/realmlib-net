import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Sent when the player inflicts a condition effect.
 */
export class SetConditionPacket implements Packet {

  type = PacketType.SETCONDITION;
  propagate = true;

  //#region packet-specific members
  /**
   * The condition effect being conflicted.
   */
  conditionEffect: number;
  /**
   * The duration of the conditin effect.
   */
  conditionDuration: number;
  //#endregion

  write(writer: Writer): void {
    writer.writeByte(this.conditionEffect);
    writer.writeFloat(this.conditionDuration);
  }

  read(reader: Reader): void {
    this.conditionEffect = reader.readByte();
    this.conditionDuration = reader.readFloat();
  }
}
