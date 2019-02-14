import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';
import { Point } from '../../data/world-pos-data';
import { SlotObjectData } from '../../data/slot-object-data';

/**
 * Sent to swap the items of two slots.
 */
export class InvSwapPacket implements Packet {

  type = PacketType.INVSWAP;
  propagate = true;

  //#region packet-specific members
  /**
   * The current client time.
   */
  time: number;
  /**
   * The current client position.
   */
  position: Point;
  /**
   * The slot to swap from.
   */
  slotObject1: SlotObjectData;
  /**
   * The slot to swap to.
   */
  slotObject2: SlotObjectData;
  //#endregion

  write(writer: Writer): void {
    writer.writeInt32(this.time);
    this.position.write(writer);
    this.slotObject1.write(writer);
    this.slotObject2.write(writer);
  }

  read(reader: Reader): void {
    this.time = reader.readInt32();
    this.position = new Point();
    this.position.read(reader);
    this.slotObject1 = new SlotObjectData();
    this.slotObject1.read(reader);
    this.slotObject2 = new SlotObjectData();
    this.slotObject2.read(reader);
  }
}
