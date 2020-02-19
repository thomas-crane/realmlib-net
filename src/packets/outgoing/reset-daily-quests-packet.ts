import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';

/**
 * Sent to reset the daily quests currently available.
 */
export class ResetDailyQuestsPacket implements Packet {

  readonly type = PacketType.RESET_DAILY_QUESTS;
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
