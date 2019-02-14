import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';
import { SlotObjectData } from '../../data/slot-object-data';

/**
 * Sent to drop an item from the client's inventory.
 */
export class InvDropPacket implements Packet {

  type = PacketType.INVDROP;
  propagate = true;

  //#region packet-specific members
  /**
   * The slot to drop the item from.
   */
  slotObject: SlotObjectData;
  //#endregion

  write(writer: Writer): void {
    this.slotObject.write(writer);
  }

  read(reader: Reader): void {
    this.slotObject = new SlotObjectData();
    this.slotObject.read(reader);
  }
}
