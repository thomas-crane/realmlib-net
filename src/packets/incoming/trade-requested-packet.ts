import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Received when a trade is requested.
 */
export class TradeRequestedPacket implements Packet {

  type = PacketType.TRADEREQUESTED;
  propagate = true;

  //#region packet-specific members
  /**
   * The name of the player who requested the trade.
   */
  name: string;
  //#endregion

  read(reader: Reader): void {
    this.name = reader.readString();
  }

  write(writer: Writer): void {
    writer.writeString(this.name);
  }
}
