import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received in response to the `HelloPacket`.
 */
export class MapInfoPacket implements Packet {

  readonly type = PacketType.MAPINFO;

  //#region packet-specific members
  /**
   * The width of the map.
   */
  width: number;
  /**
   * The height of the map.
   */
  height: number;
  /**
   * The name of the map.
   */
  name: string;
  /**
   * > Unknown.
   */
  displayName: string;
  /**
   * The name of the realm.
   */
  realmName: string;
  /**
   * The difficulty rating of the map.
   */
  difficulty: number;
  /**
   * The seed value for the client's PRNG.
   */
  fp: number;
  /**
   * > Unkown.
   */
  background: number;
  /**
   * Whether or not players can teleport in the map.
   */
  allowPlayerTeleport: boolean;
  /**
   * > Unkown.
   */
  showDisplays: boolean;
  /**
   * The number of players allowed in this map.
   */
  maxPlayers: number;
  /**
   * The connection guid to use for the hello packet.
   */
  connectionGuid: string;
  /**
   * > Unkown.
   */
  clientXML: string[];
  /**
   * > Unkown.
   */
  extraXML: string[];

  /**
   * > Unknown.
   */
  gameOpenedTime: number;
  //#endregion

  constructor() {
    this.width = 0;
    this.height = 0;
    this.name = '';
    this.displayName = '';
    this.realmName = '';
    this.difficulty = 0;
    this.fp = 0;
    this.background = 0;
    this.allowPlayerTeleport = false;
    this.showDisplays = false;
    this.maxPlayers = 0;
    this.connectionGuid = '';
    this.clientXML = [];
    this.extraXML = [];
    this.gameOpenedTime = 0;
  }

  read(reader: Reader): void {
    this.width = reader.readInt32();
    this.height = reader.readInt32();
    this.name = reader.readString();
    this.displayName = reader.readString();
    this.realmName = reader.readString();
    this.fp = reader.readUInt32();
    this.background = reader.readInt32();
    this.difficulty = reader.readInt32();
    this.allowPlayerTeleport = reader.readBoolean();
    this.showDisplays = reader.readBoolean();
    this.maxPlayers = reader.readShort();
    this.connectionGuid = reader.readString();
    this.clientXML = new Array<string>(reader.readShort());
    for (let i = 0; i < this.clientXML.length; i++) {
      this.clientXML[i] = reader.readStringUTF32();
    }
    this.extraXML = new Array<string>(reader.readShort());
    for (let i = 0; i < this.extraXML.length; i++) {
      this.extraXML[i] = reader.readStringUTF32();
    }
    this.gameOpenedTime = reader.readInt32();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.width);
    writer.writeInt32(this.height);
    writer.writeString(this.name);
    writer.writeString(this.displayName);
    writer.writeString(this.realmName);
    writer.writeInt32(this.fp);
    writer.writeInt32(this.background);
    writer.writeInt32(this.difficulty);
    writer.writeBoolean(this.allowPlayerTeleport);
    writer.writeBoolean(this.showDisplays);
    writer.writeShort(this.maxPlayers);
    writer.writeString(this.connectionGuid);
    writer.writeShort(this.clientXML.length);
    for (const xml of this.clientXML) {
      writer.writeStringUTF32(xml);
    }
    writer.writeShort(this.extraXML.length);
    for (const xml of this.extraXML) {
      writer.writeStringUTF32(xml);
    }
    writer.writeInt32(this.gameOpenedTime);
  }
}
