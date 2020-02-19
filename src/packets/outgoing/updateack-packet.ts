import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';

/**
 * Sent to acknowledge an `UpdatePacket`.
 */
export class UpdateAckPacket implements Packet {

  readonly type = PacketType.UPDATEACK;
  propagate = true;

  //#region packet-specific members

  //#endregion

  write(): void {
    //
  }

  read(): void {
    //
  }
}
