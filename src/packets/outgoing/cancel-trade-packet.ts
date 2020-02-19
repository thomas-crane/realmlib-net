import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';

/**
 * Sent to cancel the current active trade.
 */
export class CancelTradePacket implements Packet {

  readonly type = PacketType.CANCELTRADE;
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
