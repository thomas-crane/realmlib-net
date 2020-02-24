import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to claim rewards from the login calendar.
 */
export class ClaimDailyRewardMessage implements Packet {

  readonly type = PacketType.CLAIM_LOGIN_REWARD_MSG;

  //#region packet-specific members
  /**
   * The key of the item being claimed.
   */
  claimKey: string;
  /**
   * The type of claim being made.
   */
  claimType: string;
  //#endregion

  constructor() {
    this.claimKey = '';
    this.claimType = '';
  }

  write(writer: Writer): void {
    writer.writeString(this.claimKey);
    writer.writeString(this.claimType);
  }

  read(reader: Reader): void {
    this.claimKey = reader.readString();
    this.claimType = reader.readString();
  }
}
