import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received to tell the client how many heroes are left in the current realm.
 */
export class RealmHeroesLeftPacket implements Packet {

  readonly type = PacketType.REALM_HERO_LEFT_MSG;

  //#region packet-specific members
  /**
   * The number of heroes remaining.
   */
  realmHeroesLeft: number;
  //#endregion

  constructor() {
    this.realmHeroesLeft = 0;
  }

  read(reader: Reader): void {
    this.realmHeroesLeft = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.realmHeroesLeft);
  }
}
