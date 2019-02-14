import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Sent to invite a player to the client's current guild.
 */
export class GuildInvitePacket implements Packet {

  type = PacketType.GUILDINVITE;
  propagate = true;

  //#region packet-specific members
  /**
   * The name of the player to invite.
   */
  name: string;
  //#endregion

  write(writer: Writer): void {
    writer.writeString(this.name);
  }

  read(reader: Reader): void {
    this.name = reader.readString();
  }
}
