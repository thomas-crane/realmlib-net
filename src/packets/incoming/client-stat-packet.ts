import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received to give the player information about their stats.
 */
export class ClientStatPacket implements Packet {

  readonly type = PacketType.CLIENTSTAT;

  //#region packet-specific members
  /**
   * The name of the stat.
   */
  name: string;
  /**
   * The value of the stat.
   */
  value: number;
  //#endregion

  constructor() {
    this.name = '';
    this.value = 0;
  }

  read(reader: Reader): void {
    this.name = reader.readString();
    this.value = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeString(this.name);
    writer.writeInt32(this.value);
  }
}
