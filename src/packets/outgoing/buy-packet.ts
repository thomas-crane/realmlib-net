import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to buy an item.
 */
export class BuyPacket implements Packet {

  type = PacketType.BUY;
  propagate = true;

  //#region packet-specific members
  /**
   * The object id of the item being purchased.
   */
  objectId: number;
  /**
   * The number of items being purchased.
   */
  quantity: number;
  //#endregion

  write(writer: Writer): void {
    writer.writeInt32(this.objectId);
    writer.writeInt32(this.quantity);
  }

  read(reader: Reader): void {
    this.objectId = reader.readInt32();
    this.quantity = reader.readInt32();
  }
}
