import { SlotObjectData } from '../../../data/slot-object-data';
import { Packet } from '../../../packet';
import { PacketType } from '../../../packet-type';
import { Reader } from '../../../reader';
import { Writer } from '../../../writer';

/**
 * > Unknown.
 */
export class QuestRedeemPacket implements Packet {

  readonly type = PacketType.QUEST_REDEEM;
  propagate = true;

  //#region packet-specific members
  /**
   * > Unknown.
   */
  questId: string;
  /**
   * > Unknown.
   */
  slots: SlotObjectData[];
  //#endregion

  constructor() {
    this.questId = '';
    this.slots = [];
  }

  write(writer: Writer): void {
    writer.writeString(this.questId);
    writer.writeShort(this.slots.length);
    for (const slot of this.slots) {
      slot.write(writer);
    }
  }

  read(reader: Reader): void {
    this.questId = reader.readString();
    const slotsLen = reader.readShort();
    this.slots = new Array(slotsLen);
    for (let i = 0; i < slotsLen; i++) {
      this.slots[i] = new SlotObjectData();
      this.slots[i].read(reader);
    }
  }
}
