import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * > Unknown.
 */
export class QuestRedeemResponsePacket implements Packet {

  type = PacketType.QUEST_REDEEM_RESPONSE;
  propagate = true;

  //#region packet-specific members
  /**
   * > Unknown.
   */
  ok: boolean;
  /**
   * > Unknown.
   */
  message: string;
  //#endregion

  read(reader: Reader): void {
    this.ok = reader.readBoolean();
    this.message = reader.readString();
  }

  write(writer: Writer): void {
    writer.writeBoolean(this.ok);
    writer.writeString(this.message);
  }
}
