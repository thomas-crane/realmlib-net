import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received occasionally by the server to prompt a response from the client.
 */
export class PingPacket implements Packet {

  readonly type = PacketType.PING;

  //#region packet-specific members
  /**
   * A nonce value which is expected to be present in the reply.
   */
  serial: number;
  //#endregion

  constructor() {
    this.serial = 0;
  }

  read(reader: Reader): void {
    this.serial = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.serial);
  }
}
