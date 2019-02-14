import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

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
