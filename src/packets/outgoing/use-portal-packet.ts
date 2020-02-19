import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to prompt the server to send a `ReconnectPacket` which
 * contains the reconnect information for the used portal.
 */
export class UsePortalPacket implements Packet {

  readonly type = PacketType.USEPORTAL;
  propagate = true;

  //#region packet-specific members
  /**
   * The object id of the portal to enter.
   */
  objectId: number;
  //#endregion

  constructor() {
    this.objectId = 0;
  }

  write(writer: Writer): void {
    writer.writeInt32(this.objectId);
  }

  read(reader: Reader): void {
    this.objectId = reader.readInt32();
  }
}
