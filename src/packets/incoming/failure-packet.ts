import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';
import { FailureCode } from '../../models/failure-code';

/**
 * Received when an error has occurred.
 */
export class FailurePacket implements Packet {

  type = PacketType.FAILURE;
  propagate = true;

  //#region packet-specific members
  /**
   * The error id of the failure.
   * @see `FailureCode`
   */
  errorId: FailureCode;
  /**
   * A description of the error.
   */
  errorDescription: string;
  /**
   * > Unknown.
   */
  errorPlace: string;
  /**
   * > Unknown.
   */
  errorConnectionId: string;
  //#endregion

  read(reader: Reader): void {
    this.errorId = reader.readInt32();
    this.errorDescription = reader.readString();
    this.errorPlace = reader.readString();
    this.errorConnectionId = reader.readString();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.errorId);
    writer.writeString(this.errorDescription);
    writer.writeString(this.errorPlace);
    writer.writeString(this.errorConnectionId);
  }
}
