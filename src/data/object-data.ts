import { DataPacket } from '../packet';
import { Reader } from '../reader';
import { Writer } from '../writer';
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

  read(reader: Reader): void {
    this.objectType = reader.readUnsignedShort();
    this.status = new ObjectStatusData();
    this.status.read(reader);
  }

  write(writer: Writer): void {
    writer.writeUnsignedShort(this.objectType);
    this.status.write(writer);
  }
}
