import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to acknowledge a `GotoPacket`.
 */
export class GotoAckPacket implements Packet {

  readonly type = PacketType.GOTOACK;
  propagate = true;

  //#region packet-specific members
  /**
   * The current client time.
   */
  time: number;
  //#endregion

  constructor() {
    this.time = 0;
  }

  write(writer: Writer): void {
    writer.writeInt32(this.time);
  }

  read(reader: Reader): void {
    this.time = reader.readInt32();
  }
}
