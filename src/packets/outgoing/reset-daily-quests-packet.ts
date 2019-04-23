import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Sent to reset the daily quests currently available.
 */
export class ResetDailyQuestsPacket implements Packet {

  type = PacketType.RESET_DAILY_QUESTS;
  propagate = true;

  //#region packet-specific members

  //#endregion

  write(writer: Writer): void {
    //
  }

  read(reader: Reader): void {
    //
  }
}
