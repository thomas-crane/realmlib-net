import { Writer } from '../../../writer';
import { Reader } from '../../../reader';
import { PacketType } from '../../../packet-type';
import { Packet } from '../../../packet';

/**
 * Received to notify the player that a pet has been deleted.
 */
export class DeletePetMessage implements Packet {

  type = PacketType.DELETE_PET;
  propagate = true;

  //#region packet-specific members
  /**
   * The id of the pet which has been deleted.
   */
  petId: number;
  //#endregion

  read(reader: Reader): void {
    this.petId = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.petId);
  }
}
