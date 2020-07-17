import { ObjectStatusData } from '../../data/object-status-data';
import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received to notify the player of a new game tick.
 */
export class NewTickPacket implements Packet {

  readonly type = PacketType.NEWTICK;

  //#region packet-specific members
  /**
   * The id of the tick.
   */
  tickId: number;
  /**
   * The time between the last tick and this tick, in milliseconds.
   *
   * This is not always accurate, so it is better to calculate it manually
   * if millisecond-level accuracy is required.
   */
  tickTime: number;
  /**
   * Server time in ms
   */
  serverRealTimeMS: number;
  /**
   * Last server time im ms?
   */
  serverLastTimeRTTMS: number;
  /**
   * An array of statuses for objects which are currently visible to the player.
   *
   * "visible" objects can include objects which would normally be off screen,
   * such as players, which are always at least visible on the minimap.
   */
  statuses: ObjectStatusData[];
  //#endregion

  constructor() {
    this.tickId = 0;
    this.tickTime = 0;
    this.serverRealTimeMS = 0;
    this.serverLastTimeRTTMS = 0;
    this.statuses = [];
  }

  read(reader: Reader): void {
    this.tickId = reader.readInt32();
    this.tickTime = reader.readInt32();
    this.serverRealTimeMS = reader.readUInt32();
    this.serverLastTimeRTTMS = reader.readUnsignedShort();
    const statusesLen = reader.readShort();
    this.statuses = new Array<ObjectStatusData>(statusesLen);
    for (let i = 0; i < statusesLen; i++) {
      const osd = new ObjectStatusData();
      osd.read(reader);
      this.statuses[i] = osd;
    }
  }

  write(writer: Writer): void {
    writer.writeInt32(this.tickId);
    writer.writeInt32(this.tickTime);
    writer.writeShort(this.statuses.length);
    for (const status of this.statuses) {
      status.write(writer);
    }
  }
}
