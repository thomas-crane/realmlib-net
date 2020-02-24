import { PacketType } from './packet-type';
import { Reader } from './reader';
import { Writer } from './writer';

/**
 * A packet which can be both received from the server and sent to the server.
 */
export interface DataPacket {
  /**
   * Writes the packet to the `writer` according to the packet's structure.
   * @param writer The writer to write to.
   */
  write(writer: Writer): void;
  /**
   * Reads data from the `reader` according to the structure of the packet.
   * @param reader The reader to read from.
   */
  read(reader: Reader): void;
}

/**
 * A packet which has an associated type.
 */
export interface Packet extends DataPacket {
  /**
   * The type of this packet.
   */
  readonly type: PacketType;
}
