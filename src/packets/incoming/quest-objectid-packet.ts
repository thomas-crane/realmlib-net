import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received to tell the player the object id of their current quest.
 */
export class QuestObjectIdPacket implements Packet {

  type = PacketType.QUESTOBJID;
  propagate = true;

  //#region packet-specific members
  /**
   * The object id of the current quest.
   */
  objectId: number;
  //#endregion

  read(reader: Reader): void {
    this.objectId = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.objectId);
  }
}
