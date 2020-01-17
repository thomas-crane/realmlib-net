import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to prompt the server to send a `ReconnectPacket` which
 * contains the reconnect information for the Nexus.
 */
export class EscapePacket implements Packet {

  type = PacketType.ESCAPE;
  propagate = true;

  //#region packet-specific members

  //#endregion

  write(writer: Writer): void {
    //
  }

  read(reader: Reader): void {
    //
  }
}
