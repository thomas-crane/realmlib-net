import { DataPacket } from '../packet';
import { Reader } from '../reader';
import { Writer } from '../writer';

export class SlotObjectData implements DataPacket {

  /**
   * The object id of the entity which owns the slot.
   */
  objectId: number;
  /**
   * The index of the slot. E.g. The 4th inventory slot has the slot id `3`.
   */
  slotId: number;
  /**
   * The item id of the item in the slot, or `-1` if it is empty.
   */
  objectType: number;

  read(reader: Reader): void {
    this.objectId = reader.readInt32();
    this.slotId = reader.readUnsignedByte();
    this.objectType = reader.readUInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.objectId);
    writer.writeUnsignedByte(this.slotId);
    writer.writeInt32(this.objectType);
  }
}
