import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';

/**
 * > Unknown.
 */
export class CheckCreditsPacket implements Packet {

  readonly type = PacketType.CHECKCREDITS;

  //#region packet-specific members

  //#endregion

  write(): void {
    //
  }

  read(): void {
    //
  }
}
