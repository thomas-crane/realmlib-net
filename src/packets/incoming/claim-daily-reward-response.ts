import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received in response to a `ClaimDailyRewardMessage`.
 */
export class ClaimDailyRewardResponse implements Packet {

  readonly type = PacketType.LOGIN_REWARD_MSG;
  propagate = true;

  //#region packet-specific members
  /**
   * The item id of the reward received.
   */
  itemId: number;
  /**
   * The number of items received.
   */
  quantity: number;
  /**
   * Unknown.
   */
  gold: number;
  //#endregion

  constructor() {
    this.itemId = 0;
    this.quantity = 0;
    this.gold = 0;
  }

  read(reader: Reader): void {
    this.itemId = reader.readInt32();
    this.quantity = reader.readInt32();
    this.gold = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.itemId);
    writer.writeInt32(this.quantity);
    writer.writeInt32(this.gold);
  }
}
