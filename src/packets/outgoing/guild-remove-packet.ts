import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to remove a player from the client's current guild.
 */
export class GuildRemovePacket implements Packet {

  type = PacketType.GUILDREMOVE;
  propagate = true;

  //#region packet-specific members
  /**
   * The name of the player to remove.
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
