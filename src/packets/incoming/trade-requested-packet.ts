import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received when a trade is requested.
 */
export class TradeRequestedPacket implements Packet {

  readonly type = PacketType.TRADEREQUESTED;
  propagate = true;

  //#region packet-specific members
  /**
   * The name of the player who requested the trade.
   */
  name: string;
  //#endregion

  constructor() {
    this.name = '';
  }

  read(reader: Reader): void {
    this.name = reader.readString();
  }

  write(writer: Writer): void {
    writer.writeString(this.name);
  }
}
