import { Writer } from '../writer';
import { Reader } from '../reader';
import { DataPacket } from '../packet';
import { ObjectStatusData } from './object-status-data';

export class ObjectData implements DataPacket {
  /**
   * The type of this object.
   */
  objectType: number;
  /**
   * The status of this object.
   */
  status: ObjectStatusData;

  constructor() {
    this.objectType = 0;
    this.status = new ObjectStatusData();
  }

  read(reader: Reader): void {
    this.objectType = reader.readUnsignedShort();
    this.status.read(reader);
  }

  write(writer: Writer): void {
    writer.writeUnsignedShort(this.objectType);
    this.status.write(writer);
  }
}
