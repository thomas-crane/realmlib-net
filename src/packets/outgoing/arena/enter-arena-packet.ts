import { Writer } from '../../../writer';
import { Reader } from '../../../reader';
import { PacketType } from '../../../packet-type';
import { Packet } from '../../../packet';

/**
 * Sent to enter the arena.
 */
export class EnterArenaPacket implements Packet {

  type = PacketType.ENTER_ARENA;
  propagate = true;

  //#region packet-specific members
  /**
   * > Unknown.
   */
  currency: number;
  //#endregion

  write(writer: Writer): void {
    writer.writeInt32(this.currency);
  }

  read(reader: Reader): void {
    this.currency = reader.readInt32();
  }
}
