import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';

/**
 * Sent to prompt the server to send a `ReconnectPacket` which
 * contains the reconnect information for the Nexus.
 */
export class EscapePacket implements Packet {

  readonly type = PacketType.ESCAPE;

  //#region packet-specific members

  //#endregion

  write(): void {
    //
  }

  read(): void {
    //
  }
}
