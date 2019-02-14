import { Writer } from '../../../writer';
import { Reader } from '../../../reader';
import { PacketType } from '../../../packet-type';
import { Packet } from '../../../packet';

/**
 * Sent to make an update to the pet currently following the player.
 */
export class ActivePetUpdateRequestPacket implements Packet {

  type = PacketType.ACTIVE_PET_UPDATE_REQUEST;
  propagate = true;

  //#region packet-specific members
  /**
   * The type of update to perform.
   */
  commandType: number;
  /**
   * The instance id of the pet to update.
   */
  instanceId: number;
  //#endregion

  write(writer: Writer): void {
    writer.writeByte(this.commandType);
    writer.writeInt32(this.instanceId);
  }

  read(reader: Reader): void {
    this.commandType = reader.readByte();
    this.instanceId = reader.readInt32();
  }
}
