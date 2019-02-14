import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Received to prompt the player to verify their email.
 */
export class VerifyEmailPacket implements Packet {

  type = PacketType.VERIFY_EMAIL;
  propagate = true;

  //#region packet-specific members

  //#endregion

  read(reader: Reader): void {
    //
  }

  write(writer: Writer): void {
    //
  }
}
