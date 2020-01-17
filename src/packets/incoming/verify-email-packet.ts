import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

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
