import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to accept a pending guild invite.
 */
export class JoinGuildPacket implements Packet {

  readonly type = PacketType.JOINGUILD;

  //#region packet-specific members
  /**
   * The name of the guild for which there is a pending invite.
   */
  guildName: string;
  //#endregion

  constructor() {
    this.guildName = '';
  }

  write(writer: Writer): void {
    writer.writeString(this.guildName);
  }

  read(reader: Reader): void {
    this.guildName = reader.readString();
  }
}
