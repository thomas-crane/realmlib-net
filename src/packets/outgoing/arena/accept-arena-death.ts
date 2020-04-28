import { Packet } from '../../../packet';
import { PacketType } from '../../../packet-type';

/**
 * Sent to accept a death in the arena.
 */
export class AcceptArenaDeathPacket implements Packet {

  readonly type = PacketType.ACCEPT_ARENA_DEATH;
  propagate = true;

  //#region packet-specific members

  //#endregion

  write(): void {
    //
  }

  read(): void {
    //
  }
}
