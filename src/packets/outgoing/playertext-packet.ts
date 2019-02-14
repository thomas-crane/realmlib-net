import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Sent when the client sends a chat message.
 */
export class PlayerTextPacket implements Packet {

  type = PacketType.PLAYERTEXT;
  propagate = true;

  //#region packet-specific members
  /**
   * The message to send.
   */
  text: string;
  //#endregion

  write(writer: Writer): void {
    writer.writeString(this.text);
  }

  read(reader: Reader): void {
    this.text = reader.readString();
  }
}
