import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Sent in response to a `MapInfoPacket` to load a character into the map.
 */
export class LoadPacket implements Packet {

  type = PacketType.LOAD;
  propagate = true;

  //#region packet-specific members
  /**
   * The id of the character to load.
   */
  charId: number;
  /**
   * Whether or not the `MapInfoPacket` being responded to is from the arena.
   */
  isFromArena: boolean;
  /**
   * Whether or not the character is in challenger mode.
   */
  isChallenger: boolean;
  //#endregion

  write(writer: Writer): void {
    writer.writeInt32(this.charId);
    writer.writeBoolean(this.isFromArena);
    writer.writeBoolean(this.isChallenger);
  }

  read(reader: Reader): void {
    this.charId = reader.readInt32();
    this.isFromArena = reader.readBoolean();
    this.isChallenger = reader.readBoolean();
  }
}
