import { SlotObjectData } from '../../../data';
import { Packet } from '../../../packet';
import { PacketType } from '../../../packet-type';
import { Reader } from '../../../reader';
import { Writer } from '../../../writer';

/**
 * Sent to make an update to the pet currently following the player.
 */
export class ReskinPetPacket implements Packet {

  type = PacketType.PET_CHANGE_FORM_MSG;
  propagate = true;

  //#region packet-specific members
  /**
   * The instance id of the pet to update.
   */
  instanceId: number;
  /**
   * The pet type that the pet will become after the form change.
   */
  newPetType: number;
  item: SlotObjectData;
  //#endregion

  write(writer: Writer): void {
    writer.writeInt32(this.instanceId);
    writer.writeByte(this.newPetType);
    this.item.write(writer);
  }

  read(reader: Reader): void {
    this.instanceId = reader.readInt32();
    this.newPetType = reader.readByte();
    this.item = new SlotObjectData();
    this.item.read(reader);
  }
}
