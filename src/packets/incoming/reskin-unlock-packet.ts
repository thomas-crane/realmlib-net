import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received to notify the player that a new skin has been unlocked.
 */
export class ReskinUnlockPacket implements Packet {

  readonly type = PacketType.RESKIN_UNLOCK;
  propagate = true;

  //#region packet-specific members
  /**
   * The id of the skin that was unlocked.
   */
  skinId: number;
  //#endregion

  constructor() {
    this.skinId = 0;
  }

  read(reader: Reader): void {
    this.skinId = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.skinId);
  }
}
