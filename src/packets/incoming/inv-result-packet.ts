import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * > Unknown.
 */
export class InvResultPacket implements Packet {

  type = PacketType.INVRESULT;
  propagate = true;

  //#region packet-specific members
  /**
   * > Unknown.
   */
  result: number;
  //#endregion

  read(reader: Reader): void {
    this.result = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.result);
  }
}
