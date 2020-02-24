import { SlotObjectData } from '../../data/slot-object-data';
import { WorldPosData } from '../../data/world-pos-data';
import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to use an item, such as an ability or consumable.
 */
export class UseItemPacket implements Packet {

  readonly type = PacketType.USEITEM;

  //#region packet-specific members
  /**
   * The current client time.
   */
  time: number;
  /**
   * The slot of the item being used.
   */
  slotObject: SlotObjectData;
  /**
   * The position at which the item was used.
   */
  itemUsePos: WorldPosData;
  /**
   * The type of item usage.
   */
  useType: number;
  //#endregion

  constructor() {
    this.time = 0;
    this.slotObject = new SlotObjectData();
    this.itemUsePos = new WorldPosData();
    this.useType = 0;
  }

  write(writer: Writer): void {
    writer.writeInt32(this.time);
    this.slotObject.write(writer);
    this.itemUsePos.write(writer);
    writer.writeByte(this.useType);
  }

  read(reader: Reader): void {
    this.time = reader.readInt32();
    this.slotObject.read(reader);
    this.itemUsePos.read(reader);
    this.useType = reader.readByte();
  }
}
