import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * > Unknown.
 */
export class GuildResultPacket implements Packet {

  readonly type = PacketType.GUILDRESULT;

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

  constructor() {
    this.success = false;
    this.lineBuilderJSON = '';
  }

  read(reader: Reader): void {
    this.success = reader.readBoolean();
    this.lineBuilderJSON = reader.readString();
  }

  write(writer: Writer): void {
    writer.writeBoolean(this.success);
    writer.writeString(this.lineBuilderJSON);
  }
}
