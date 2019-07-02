import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Received when a chat message is sent by another player or NPC.
 */
export class TextPacket implements Packet {

  type = PacketType.TEXT;
  propagate = true;

  //#region packet-specific members
  /**
   * The sender of the message.
   */
  name: string;
  /**
   * The object id of the sender.
   */
  objectId: number;
  /**
   * The number of stars of the sender.
   */
  numStars: number;
  /**
   * The length of time to display the chat bubble for.
   */
  bubbleTime: number;
  /**
   * The recipient of the message. This is only used if the
   * message is a private message.
   */
  recipient: string;
  /**
   * The content of the message.
   */
  text: string;
  /**
   * > Unknown.
   */
  cleanText: string;
  /**
   * Whether or not the sender of the message is a supporter.
   */
  isSupporter: boolean;
  //#endregion

  read(reader: Reader): void {
    this.name = reader.readString();
    this.objectId = reader.readInt32();
    this.numStars = reader.readInt32();
    this.bubbleTime = reader.readUnsignedByte();
    this.recipient = reader.readString();
    this.text = reader.readString();
    this.cleanText = reader.readString();
    this.isSupporter = reader.readBoolean();
  }

  write(writer: Writer): void {
    writer.writeString(this.name);
    writer.writeInt32(this.objectId);
    writer.writeInt32(this.numStars);
    writer.writeUnsignedByte(this.bubbleTime);
    writer.writeString(this.recipient);
    writer.writeString(this.text);
    writer.writeString(this.cleanText);
    writer.writeBoolean(this.isSupporter);
  }
}
