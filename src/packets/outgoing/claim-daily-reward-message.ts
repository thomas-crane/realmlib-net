import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Sent to claim rewards from the login calendar.
 */
export class ClaimDailyRewardMessage implements Packet {

  type = PacketType.CLAIM_LOGIN_REWARD_MSG;
  propagate = true;

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

  write(writer: Writer): void {
    writer.writeString(this.claimKey);
    writer.writeString(this.claimType);
  }

  read(reader: Reader): void {
    this.claimKey = reader.readString();
    this.claimType = reader.readString();
  }
}
