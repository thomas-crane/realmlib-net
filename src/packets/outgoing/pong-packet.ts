import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to acknowledge the `PingPacket.`
 */
export class PongPacket implements Packet {

  type = PacketType.PONG;
  propagate = true;

  //#region packet-specific members
  /**
   * The serial value received in the `PingPacket` which this acknowledges.
   */
  serial: number;
  /**
   * The current client time.
   */
  time: number;
  //#endregion

  write(writer: Writer): void {
    writer.writeInt32(this.serial);
    writer.writeInt32(this.time);
  }

  read(reader: Reader): void {
    this.serial = reader.readInt32();
    this.time = reader.readInt32();
  }
}
