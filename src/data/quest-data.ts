import { DataPacket } from '../packet';
import { Reader } from '../reader';
import { Writer } from '../writer';

/**
 * Information about a quest, such as a daily quest.
 */
export class QuestData implements DataPacket {
  /**
   * The id of this quest.
   */
  id: string;
  /**
   * The name of this quest.
   */
  name: string;
  /**
   * The description of this quest.
   */
  description: string;
  /**
   * The expiration time of this quest.
   */
  expiration: string;
  /**
   * The list of item IDs which are required to complete this quest.
   */
  requirements: number[];
  /**
   * The list of item IDs which are awarded upon completion of this quest.
   */
  rewards: number[];
  /**
   * Whether or not this quest has been completed.
   */
  completed: boolean;
  /**
   * > Unknown.
   */
  itemOfChoice: boolean;
  /**
   * Whether or not the quest is repeatable.
   */
  repeatable: boolean;
  /**
   * The category of this quest.
   */
  category: number;

  read(reader: Reader): void {
    this.id = reader.readString();
    this.name = reader.readString();
    this.description = reader.readString();
    this.expiration = reader.readString();
    this.category = reader.readInt32();
    const requirementsLen = reader.readShort();
    this.requirements = new Array<number>(requirementsLen);
    for (let i = 0; i < requirementsLen; i++) {
      this.requirements[i] = reader.readInt32();
    }

    const rewardsLen = reader.readShort();
    this.rewards = new Array<number>(rewardsLen);
    for (let i = 0; i < rewardsLen; i++) {
      this.rewards[i] = reader.readInt32();
    }
    this.completed = reader.readBoolean();
    this.itemOfChoice = reader.readBoolean();
    this.repeatable = reader.readBoolean();
  }

  write(writer: Writer): void {
    writer.writeString(this.id);
    writer.writeString(this.name);
    writer.writeString(this.description);
    writer.writeString(this.expiration);
    writer.writeInt32(this.category);
    writer.writeShort(this.requirements.length);
    for (const requirement of this.requirements) {
      writer.writeInt32(requirement);
    }
    writer.writeShort(this.rewards.length);
    for (const reward of this.rewards) {
      writer.writeInt32(reward);
    }
    writer.writeBoolean(this.completed);
    writer.writeBoolean(this.itemOfChoice);
    writer.writeBoolean(this.repeatable);
  }
}
