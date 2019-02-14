import { Writer } from '../../../writer';
import { Reader } from '../../../reader';
import { PacketType } from '../../../packet-type';
import { Packet } from '../../../packet';

/**
 * Received to give the player information about a newly evolved pet.
 */
export class EvolvedPetMessage implements Packet {

  type = PacketType.EVOLVE_PET;
  propagate = true;

  //#region packet-specific members
  /**
   * The id of the pet which has evolved.
   */
  petId: number;
  /**
   * The current skin id of the pet.
   */
  initialSkin: number;
  /**
   * The skin id of the pet after its evolution.
   */
  finalSkin: number;
  //#endregion

  read(reader: Reader): void {
    this.petId = reader.readInt32();
    this.initialSkin = reader.readInt32();
    this.finalSkin = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.petId);
    writer.writeInt32(this.initialSkin);
    writer.writeInt32(this.finalSkin);
  }
}
