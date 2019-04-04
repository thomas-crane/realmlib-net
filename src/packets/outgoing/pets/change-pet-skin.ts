import { PetUpgradePaymentType } from '../../../models';
import { Packet } from '../../../packet';
import { PacketType } from '../../../packet-type';
import { Reader } from '../../../reader';
import { Writer } from '../../../writer';

/**
 * Sent to change skin of a pet.
 */
export class ChangePetSkinPacket implements Packet {

  type = PacketType.PET_CHANGE_SKIN_MSG;
  propagate = true;

  //#region packet-specific members
  /**
   * The id of the pet whose skin is changing.
   */
  petId: number;
  /**
   * The id of the new skin for the pet.
   */
  skinType: number;
  /**
   * The type of currency to use when changing the pet skin.
   */
  currency: PetUpgradePaymentType;
  //#endregion

  write(writer: Writer): void {
    writer.writeInt32(this.petId);
    writer.writeInt32(this.skinType);
    writer.writeInt32(this.currency);
  }

  read(reader: Reader): void {
    this.petId = reader.readInt32();
    this.skinType = reader.readInt32();
    this.currency = reader.readInt32();
  }
}
