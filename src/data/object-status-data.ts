import { DataPacket } from '../packet';
import { Reader } from '../reader';
import { Writer } from '../writer';
import { StatData } from './stat-data';
import { WorldPosData } from './world-pos-data';

export class ObjectStatusData implements DataPacket {

  /**
   * The object id of the object which this status is for.
   */
  objectId: number;
  /**
   * The position of the object which this status is for.
   */
  pos: WorldPosData;
  /**
   * A list of stats for the object which this status is for.
   */
  stats: StatData[];

  constructor() {
    this.objectId = 0;
    this.pos = new WorldPosData();
    this.stats = [];
  }

  read(reader: Reader): void {
    this.objectId = reader.readInt32();
    this.pos.read(reader);
    const statLen = reader.readShort();
    this.stats = new Array(statLen);
    for (let i = 0; i < statLen; i++) {
      const sd = new StatData();
      sd.read(reader);
      this.stats[i] = sd;
    }
  }

  write(writer: Writer): void {
    writer.writeInt32(this.objectId);
    this.pos.write(writer);
    writer.writeShort(this.stats.length);
    for (const stat of this.stats) {
      stat.write(writer);
    }
  }
}
