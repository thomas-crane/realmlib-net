import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Received to prompt the player to enter their password.
 */
export class PasswordPromptPacket implements Packet {

  type = PacketType.PASSWORD_PROMPT;
  propagate = true;

  //#region packet-specific members
  /**
   * > Unknown.
   */
  cleanPasswordStatus: number;
  //#endregion

  read(reader: Reader): void {
    this.cleanPasswordStatus = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.cleanPasswordStatus);
  }
}
