import { GroundTileData } from '../../data/ground-tile-data';
import { ObjectData } from '../../data/object-data';
import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received when an update even occurs. Some events include
 * + One or more new objects have entered the map (become visible)
 * + One or more objects have left the map (become invisible)
 * + New tiles are visible
 */
export class UpdatePacket implements Packet {

  type = PacketType.UPDATE;
  propagate = true;

  //#region packet-specific members
  /**
   * The new tiles which are visible.
   */
  tiles: GroundTileData[];
  /**
   * The new objects which have entered the map (become visible).
   */
  newObjects: ObjectData[];
  /**
   * The visible objects which have left the map (become invisible).
   */
  drops: number[];
  //#endregion

  constructor() {
    this.tiles = [];
    this.newObjects = [];
    this.drops = [];
  }

  read(reader: Reader): void {
    const tilesLen = reader.readShort();
    this.tiles = new Array<GroundTileData>(tilesLen);
    for (let i = 0; i < tilesLen; i++) {
      const gd = new GroundTileData();
      gd.read(reader);
      this.tiles[i] = gd;
    }

    const newObjectsLen = reader.readShort();
    this.newObjects = new Array<ObjectData>(newObjectsLen);
    for (let i = 0; i < newObjectsLen; i++) {
      const od = new ObjectData();
      od.read(reader);
      this.newObjects[i] = od;
    }

    const dropsLen = reader.readShort();
    this.drops = new Array<number>(dropsLen);
    for (let i = 0; i < dropsLen; i++) {
      this.drops[i] = reader.readInt32();
    }
  }

  write(writer: Writer): void {
    writer.writeShort(this.tiles.length);
    for (const tile of this.tiles) {
      tile.write(writer);
    }
    writer.writeShort(this.newObjects.length);
    for (const obj of this.newObjects) {
      obj.write(writer);
    }
    writer.writeShort(this.drops.length);
    for (const drop of this.drops) {
      writer.writeInt32(drop);
    }
  }
}
