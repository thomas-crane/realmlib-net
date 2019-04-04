import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to request the latest quests.
 */
export class QuestFetchAskPacket implements Packet {

  type = PacketType.QUEST_FETCH_ASK;
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
