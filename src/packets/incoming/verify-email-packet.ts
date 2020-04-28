import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';

/**
 * Received to prompt the player to verify their email.
 */
export class VerifyEmailPacket implements Packet {

  readonly type = PacketType.VERIFY_EMAIL;

  //#region packet-specific members

  //#endregion

  read(): void {
    //
  }

  write(): void {
    //
  }
}
