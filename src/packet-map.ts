/**
 * A bidirectional map of packet types and their IDs.
 */
export interface PacketMap {
  [key: number]: any;
  [key: string]: any;
}
