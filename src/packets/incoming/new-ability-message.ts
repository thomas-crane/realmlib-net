import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received when a new ability has been unlocked by the player.
 */
export class NewAbilityMessage implements Packet {

  readonly type = PacketType.NEW_ABILITY;
  propagate = true;

  //#region packet-specific members
  /**
   * The type of ability which has been unlocked.
   */
  abilityType: number;
  //#endregion

  constructor() {
    this.abilityType = 0;
  }

  read(reader: Reader): void {
    this.abilityType = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.abilityType);
  }
}
