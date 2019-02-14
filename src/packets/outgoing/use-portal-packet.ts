import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Sent to prompt the server to send a `ReconnectPacket` which
 * contains the reconnect information for the used portal.
 */
export class UsePortalPacket implements Packet {

  type = PacketType.USEPORTAL;
  propagate = true;

  //#region packet-specific members
  /**
   * The object id of the portal to enter.
   */
  objectId: number;
  //#endregion

  write(writer: Writer): void {
    writer.writeInt32(this.objectId);
  }

  read(reader: Reader): void {
    this.objectId = reader.readInt32();
  }
}
