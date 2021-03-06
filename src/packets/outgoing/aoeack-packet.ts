import { WorldPosData } from '../../data/world-pos-data';
import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to acknowledge an `AoePacket`.
 */
export class AoeAckPacket implements Packet {

  readonly type = PacketType.AOEACK;

  //#region packet-specific members
  /**
   * The current client time.
   */
  time: number;
  /**
   * The position of the AoE which this packet is acknowledging.
   */
  position: WorldPosData;
  //#endregion

  constructor() {
    this.time = 0;
    this.position = new WorldPosData();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.time);
    this.position.write(writer);
  }

  read(reader: Reader): void {
    this.time = reader.readInt32();
    this.position = new WorldPosData();
    this.position.read(reader);
  }
}
