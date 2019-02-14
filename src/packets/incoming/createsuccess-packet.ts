import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Received in response to a `CreatePacket`.
 */
export class CreateSuccessPacket implements Packet {

  type = PacketType.CREATE_SUCCESS;
  propagate = true;

  //#region packet-specific members
  /**
   * The object id of the player's character.
   */
  objectId: number;
  /**
   * The character id of the player's character.
   */
  charId: number;
  //#endregion

  read(reader: Reader): void {
    this.objectId = reader.readInt32();
    this.charId = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.objectId);
    writer.writeInt32(this.charId);
  }
}
