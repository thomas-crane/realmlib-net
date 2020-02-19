import { Packet } from '../../../packet';
import { PacketType } from '../../../packet-type';
import { Reader } from '../../../reader';
import { Writer } from '../../../writer';

/**
 * Received to notify the player that a pet has been deleted.
 */
export class DeletePetMessage implements Packet {

  readonly type = PacketType.DELETE_PET;
  propagate = true;

  //#region packet-specific members
  /**
   * The id of the pet which has been deleted.
   */
  petId: number;
  //#endregion

  constructor() {
    this.petId = 0;
  }

  read(reader: Reader): void {
    this.petId = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.petId);
  }
}
