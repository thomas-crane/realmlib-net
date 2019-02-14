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

export interface Packet extends DataPacket {
  /**
   * The type of packet.
   */
  type: PacketType;
  /**
   * Whether or not the packet should keep invoking packet hooks.
   *
   * If this is set to `false` by a packet hook, then that packet hook will
   * be the last one which receives the packet. The client's packet hooks are
   * always the last ones to be called, so if this is set to `false` the packet
   * will not reach the client.
   */
  propagate: boolean;
}
