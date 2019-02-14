import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * > Unknown.
 */
export class KeyInfoResponsePacket implements Packet {

  type = PacketType.KEY_INFO_RESPONSE;
  propagate = true;

  //#region packet-specific members
  /**
   * > Unknown.
   */
  name: string;
  /**
   * > Unknown.
   */
  description: string;
  /**
   * > Unknown.
   */
  creator: string;
  //#endregion

  read(reader: Reader): void {
    this.name = reader.readString();
    this.description = reader.readString();
    this.creator = reader.readString();
  }

  write(writer: Writer): void {
    writer.writeString(this.name);
    writer.writeString(this.description);
    writer.writeString(this.creator);
  }
}
