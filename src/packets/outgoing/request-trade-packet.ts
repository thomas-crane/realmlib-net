import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to request a trade with a player, as well as
 * to accept a pending trade with a player.
 */
export class RequestTradePacket implements Packet {

  readonly type = PacketType.REQUESTTRADE;

  //#region packet-specific members
  /**
   * The name of the player to request the trade with.
   */
  name: string;
  //#endregion

  constructor() {
    this.name = '';
  }

  write(writer: Writer): void {
    writer.writeString(this.name);
  }

  read(reader: Reader): void {
    this.name = reader.readString();
  }
}
