import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Received when a global notification is sent out to all players.
 */
export class GlobalNotificationPacket implements Packet {

  type = PacketType.GLOBAL_NOTIFICATION;
  propagate = true;

  //#region packet-specific members
  /**
   * The type of notification received.
   */
  notificationType: number;
  /**
   * The notification message.
   */
  text: string;
  //#endregion

  read(reader: Reader): void {
    this.notificationType = reader.readInt32();
    this.text = reader.readString();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.notificationType);
    writer.writeString(this.text);
  }
}
