import { Writer } from '../writer';
import { Reader } from '../reader';
import { DataPacket } from '../packet';

export class WorldPosData implements DataPacket {
  /**
   * The X value of this point.
   */
  x: number;
  /**
   * The Y value of this point.
   */
  y: number;

  /**
   * Creates a new point at the origin or at the provided, x, y.
   * @param x An x value for this point. Defaults to 0.
   * @param y A y value for this point. Defaults to 0.
   */
  constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  read(reader: Reader): void {
    this.x = reader.readFloat();
    this.y = reader.readFloat();
  }

  write(writer: Writer): void {
    writer.writeFloat(this.x);
    writer.writeFloat(this.y);
  }

  /**
   * Returns the square distance between this point and the other point.
   * @param point The other point.
   */
  squareDistanceTo(point: WorldPosData): number {
    if (!(point instanceof WorldPosData) || !point) {
      throw new TypeError(`Parameter "point" must be a Point, not ${typeof point}`);
    }
    const a = point.x - this.x;
    const b = point.y - this.y;
    return a ** 2 + b ** 2;
  }

  /**
   * Returns the distance between this point and the other point.
   * @param point The other point.
   */
  distanceTo(point: WorldPosData): number {
    return Math.sqrt(this.squareDistanceTo(point));
  }

  /**
   * Returns a new `Point` which has the same x and y values.
   */
  clone(): WorldPosData {
    return new WorldPosData(this.x, this.y);
  }
}
