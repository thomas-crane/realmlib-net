import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Received in response to a `ChooseNamePacket`.
 */
export class NameResultPacket implements Packet {

  type = PacketType.NAMERESULT;
  propagate = true;

  //#region packet-specific members
  /**
   * Whether or not the name change was successful.
   */
  success: boolean;
  /**
   * The error which occurred, if the result was not successful.
   */
  errorText: string;
  //#endregion

  read(reader: Reader): void {
    this.success = reader.readBoolean();
    this.errorText = reader.readString();
  }

  write(writer: Writer): void {
    writer.writeBoolean(this.success);
    writer.writeString(this.errorText);
  }
}
