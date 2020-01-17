import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * > Unknown.
 */
export class KeyInfoRequestPacket implements Packet {

  type = PacketType.KEY_INFO_REQUEST;
  propagate = true;

  //#region packet-specific members
  /**
   * > Unknown.
   */
  itemType: number;
  //#endregion

  write(writer: Writer): void {
    writer.writeInt32(this.itemType);
  }

  read(reader: Reader): void {
    this.itemType = reader.readInt32();
  }
}
