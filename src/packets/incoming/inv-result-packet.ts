import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

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
