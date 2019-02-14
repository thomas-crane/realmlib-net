import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * > Unknown.
 */
export class GuildResultPacket implements Packet {

  type = PacketType.GUILDRESULT;
  propagate = true;

  //#region packet-specific members
  /**
   * > Unknown.
   */
  success: boolean;
  /**
   * > Unknown.
   */
  lineBuilderJSON: string;
  //#endregion

  read(reader: Reader): void {
    this.success = reader.readBoolean();
    this.lineBuilderJSON = reader.readString();
  }

  write(writer: Writer): void {
    writer.writeBoolean(this.success);
    writer.writeString(this.lineBuilderJSON);
  }
}
