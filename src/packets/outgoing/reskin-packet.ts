import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to activate a new skin for the current character.
 */
export class ReskinPacket implements Packet {

  type = PacketType.RESKIN;
  propagate = true;

  //#region packet-specific members
  /**
   * The id of the skin to activate.
   */
  skinId: number;
  //#endregion

  write(writer: Writer): void {
    writer.writeInt32(this.skinId);
  }

  read(reader: Reader): void {
    this.skinId = reader.readInt32();
  }
}
