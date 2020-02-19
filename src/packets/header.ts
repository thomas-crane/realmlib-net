/**
 * The header of a packet.
 */
export interface PacketHeader {
  /**
   * The id of this packet.
   */
  id: number;
  /**
   * The size of this packet including the header.
   */
  length: number;
}
