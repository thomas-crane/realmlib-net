import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';
import { QuestData } from '../../data/quest-data';

/**
 * Received to tell the player about new quests.
 */
export class QuestFetchResponsePacket implements Packet {

  type = PacketType.QUEST_FETCH_RESPONSE;
  propagate = true;

  //#region packet-specific members
  /**
   * The quests which were fetched.
   */
  quests: QuestData[];
  /**
   * The cost in gold of the next quest refresh.
   */
  nextRefreshPrice: number;
  //#endregion

  read(reader: Reader): void {
    const questsLen = reader.readShort();
    this.quests = new Array<QuestData>(questsLen);
    for (let i = 0; i < questsLen; i++) {
      this.quests[i] = new QuestData();
      this.quests[i].read(reader);
    }
    this.nextRefreshPrice = reader.readShort();
  }

  write(writer: Writer): void {
    writer.writeShort(this.quests.length);
    for (const quest of this.quests) {
      quest.write(writer);
    }
    writer.writeShort(this.nextRefreshPrice);
  }
}
