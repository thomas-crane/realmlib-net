import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to change the client's account name.
 */
export class ChooseNamePacket implements Packet {

  readonly type = PacketType.CHOOSENAME;
  propagate = true;

  //#region packet-specific members
  /**
   * The name to change the account's name to.
   */
  name: string;
  //#endregion

  constructor() {
    this.name = '';
  }

  write(writer: Writer): void {
    writer.writeString(this.name);
  }

  read(reader: Reader): void {
    this.name = reader.readString();
  }
}
