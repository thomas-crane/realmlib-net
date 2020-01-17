import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received when the active trade is accepted.
 */
export class TradeAcceptedPacket implements Packet {

  type = PacketType.TRADEACCEPTED;
  propagate = true;

  //#region packet-specific members
  /**
   * A description of which items in the client's inventory are selected.
   * Items 0-3 are the hotbar items, and 4-12 are the 8 inventory slots.
   *
   * If a value is `true`, then the item is selected.
   */
  clientOffer: boolean[];
  /**
   * A description of which items in the trade partner's inventory are selected.
   * Items 0-3 are the hotbar items, and 4-12 are the 8 inventory slots.
   *
   * If a value is `true`, then the item is selected.
   */
  partnerOffer: boolean[];
  //#endregion

  constructor() {
    this.clientOffer = [];
    this.partnerOffer = [];
  }

  read(reader: Reader): void {
    const clientOfferLen = reader.readShort();
    this.clientOffer = new Array<boolean>(clientOfferLen);
    for (let i = 0; i < clientOfferLen; i++) {
      this.clientOffer[i] = reader.readBoolean();
    }
    const partnerOfferLen = reader.readShort();
    this.partnerOffer = new Array<boolean>(partnerOfferLen);
    for (let i = 0; i < partnerOfferLen; i++) {
      this.partnerOffer[i] = reader.readBoolean();
    }
  }

  write(writer: Writer): void {
    writer.writeShort(this.clientOffer.length);
    for (const offer of this.clientOffer) {
      writer.writeBoolean(offer);
    }
    writer.writeShort(this.partnerOffer.length);
    for (const offer of this.partnerOffer) {
      writer.writeBoolean(offer);
    }
  }
}
