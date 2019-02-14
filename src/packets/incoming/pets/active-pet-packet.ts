import { Writer } from '../../../writer';
import { Reader } from '../../../reader';
import { PacketType } from '../../../packet-type';
import { Packet } from '../../../packet';

/**
 * Received to notify the player of a new pet.
 */
export class ActivePetPacket implements Packet {

  type = PacketType.ACTIVEPETUPDATE;
  propagate = true;

  //#region packet-specific members
  /**
   * The instance id of the active pet.
   */
  instanceId: number;
  //#endregion

  read(reader: Reader): void {
    this.instanceId = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.instanceId);
  }
}
