import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to edit an account id list.
 */
export class EditAccountListPacket implements Packet {

  readonly type = PacketType.EDITACCOUNTLIST;
  propagate = true;

  //#region packet-specific members
  /**
   * The id of the account id list being edited.
   */
  accountListId: number;
  /**
   * Whether the edit is to add to the list or remove from it.
   */
  add: boolean;
  /**
   * The object id of the player to add to the list.
   */
  objectId: number;
  //#endregion

  constructor() {
    this.accountListId = 0;
    this.add = false;
    this.objectId = 0;
  }

  write(writer: Writer): void {
    writer.writeInt32(this.accountListId);
    writer.writeBoolean(this.add);
    writer.writeInt32(this.objectId);
  }

  read(reader: Reader): void {
    this.accountListId = reader.readInt32();
    this.add = reader.readBoolean();
    this.objectId = reader.readInt32();
  }
}
