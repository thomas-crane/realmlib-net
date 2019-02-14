import { Writer } from '../writer';
import { Reader } from '../reader';
import { DataPacket } from '../packet';

export class TradeItem implements DataPacket {

  /**
   * The item id.
   */
  item: number;
  /**
   * Unknown.
   */
  slotType: number;
  /**
   * Whether or not the item is tradeable.
   */
  tradeable: boolean;
  /**
   * Whether or not the item is included in an active trade.
   */
  included: boolean;

  read(reader: Reader): void {
    this.item = reader.readInt32();
    this.slotType = reader.readInt32();
    this.tradeable = reader.readBoolean();
    this.included = reader.readBoolean();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.item);
    writer.writeInt32(this.slotType);
    writer.writeBoolean(this.tradeable);
    writer.writeBoolean(this.included);
  }
}
