import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Received occasionally by the server to prompt a response from the client.
 */
export class PingPacket implements Packet {

  type = PacketType.PING;
  propagate = true;

  //#region packet-specific members
  /**
   * A nonce value which is expected to be present in the reply.
   */
  serial: number;
  //#endregion

  read(reader: Reader): void {
    this.serial = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.serial);
  }
}
