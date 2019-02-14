import { Writer } from '../writer';
import { Reader } from '../reader';
import { DataPacket } from '../packet';
import { Point } from './world-pos-data';
import { StatData } from './stat-data';

export class ObjectStatusData implements DataPacket {

  /**
   * The object id of the object which this status is for.
   */
  objectId: number;
  /**
   * The position of the object which this status is for.
   */
  pos: Point;
  /**
   * A list of stats for the object which this status is for.
   */
  stats: StatData[];

  read(reader: Reader): void {
    this.objectId = reader.readInt32();
    this.pos = new Point();
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
