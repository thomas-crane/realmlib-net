import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Received when the active trade is changed.
 */
export class TradeChangedPacket implements Packet {

  type = PacketType.TRADECHANGED;
  propagate = true;

  //#region packet-specific members
  /**
   * A description of which items in the trade partner's inventory are selected.
   * Items 0-3 are the hotbar items, and 4-12 are the 8 inventory slots.
   *
   * If a value is `true`, then the item is selected.
   */
  offer: boolean[];
  //#endregion

  constructor() {
    this.offer = [];
  }

  read(reader: Reader): void {
    const offerLen = reader.readShort();
    this.offer = new Array<boolean>(offerLen);
    for (let i = 0; i < offerLen; i++) {
      this.offer[i] = reader.readBoolean();
    }
  }

  write(writer: Writer): void {
    writer.writeShort(this.offer.length);
    for (const offer of this.offer) {
      writer.writeBoolean(offer);
    }
  }
}
