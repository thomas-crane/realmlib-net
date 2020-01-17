import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received to instruct the client to connect to a new host.
 */
export class ReconnectPacket implements Packet {

  type = PacketType.RECONNECT;
  propagate = true;

  //#region packet-specific members
  /**
   * The name of the new host.
   */
  name: string;
  /**
   * The address of the new host.
   */
  host: string;
  /**
   * > Unknown.
   */
  stats: string;
  /**
   * The port of the new host.
   */
  port: number;
  /**
   * The `gameId` to send in the next `HelloPacket`.
   */
  gameId: number;
  /**
   * The `keyTime` to send in the next `HelloPacket`.
   */
  keyTime: number;
  /**
   * The `key` to send in the next `HelloPacket`.
   */
  key: number[];
  /**
   * Whether or not the new host is from the arena.
   */
  isFromArena: boolean;
  //#endregion

  read(reader: Reader): void {
    this.name = reader.readString();
    this.host = reader.readString();
    this.stats = reader.readString();
    this.port = reader.readInt32();
    this.gameId = reader.readInt32();
    this.keyTime = reader.readInt32();
    this.isFromArena = reader.readBoolean();
    this.key = reader.readByteArray();
  }

  write(writer: Writer): void {
    writer.writeString(this.name);
    writer.writeString(this.host);
    writer.writeString(this.stats);
    writer.writeInt32(this.port);
    writer.writeInt32(this.gameId);
    writer.writeInt32(this.keyTime);
    writer.writeBoolean(this.isFromArena);
    writer.writeByteArray(this.key);
  }
}
