import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to invite a player to the client's current guild.
 */
export class GuildInvitePacket implements Packet {

  readonly type = PacketType.GUILDINVITE;

  //#region packet-specific members
  /**
   * The name of the player to invite.
   */
  name: string;
  //#endregion

  constructor() {
    this.name = '';
  }

  write(writer: Writer): void {
    writer.writeString(this.name);
  }

  read(reader: Reader): void {
    this.name = reader.readString();
  }
}
