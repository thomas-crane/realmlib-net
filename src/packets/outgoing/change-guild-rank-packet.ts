import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to change the guild rank of a member in the player's guild.
 */
export class ChangeGuildRankPacket implements Packet {

  type = PacketType.CHANGEGUILDRANK;
  propagate = true;

  //#region packet-specific members
  /**
   * The name of the player whose rank will change.
   */
  name: string;
  /**
   * The new rank of the player.
   */
  guildRank: number;
  //#endregion

  write(writer: Writer): void {
    writer.writeString(this.name);
    writer.writeInt32(this.guildRank);
  }

  read(reader: Reader): void {
    this.name = reader.readString();
    this.guildRank = reader.readInt32();
  }
}
