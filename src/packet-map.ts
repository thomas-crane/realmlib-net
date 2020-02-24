import { PacketType } from './packet-type';

type PacketDictionary = { [key in PacketType]: number };

/**
 * A bidirectional map which can be used to lookup
 * packet types and packet ids.
 */
export class PacketMap {
  private idMap: Map<number, PacketType>;
  private typeMap: Map<PacketType, number>;

  constructor(packets: Partial<PacketDictionary>) {
    this.idMap = new Map();
    this.typeMap = new Map();
    // tslint:disable-next-line: forin
    for (const type in packets) {
      const packetType = type as PacketType;
      this.typeMap.set(packetType, packets[packetType]!);
      this.idMap.set(packets[packetType]!, packetType);
    }
  }

  /**
   * Gets the packet id which is associated with the given `type`.
   * @param type The packet type to get the id of.
   */
  getId(type: PacketType): number | undefined {
    return this.typeMap.get(type);
  }

  /**
   * Gets the packet type which is associated with the given `id`.
   * @param id The packet id to get the type of.
   */
  getType(id: number): PacketType | undefined {
    return this.idMap.get(id);
  }
}
