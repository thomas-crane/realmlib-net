import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

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
