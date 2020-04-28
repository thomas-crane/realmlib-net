import { PetYardType } from '../../../models/pet-yard-type';
import { Packet } from '../../../packet';
import { PacketType } from '../../../packet-type';
import { Reader } from '../../../reader';
import { Writer } from '../../../writer';

/**
 * Received when the pet yard is updated to a new type of yard.
 */
export class PetYardUpdate implements Packet {

  readonly type = PacketType.PETYARDUPDATE;
  propagate = true;

  //#region packet-specific members
  /**
   * The type of the new yard.
   */
  yardType: PetYardType;
  //#endregion

  constructor() {
    this.yardType = 0;
  }

  read(reader: Reader): void {
    this.yardType = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.yardType);
  }
}
