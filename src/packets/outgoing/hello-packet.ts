import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Sent to prompt the server to accept the connection of an account
 * and reply with a `MapInfoPacket`.
 */
export class HelloPacket implements Packet {

  readonly type = PacketType.HELLO;

  //#region packet-specific members
  /**
   * The current build version of RotMG.
   */
  buildVersion: string;
  /**
   * The id of the map to connect to.
   */
  gameId: number;
  /**
   * The email of the account being used.
   */
  guid: string;
  /**
   * A random 32 bit integer value.
   */
  random1: number;
  /**
   * The password of the account being used.
   */
  password: string;
  /**
   * A random 32 bit integer value.
   */
  random2: number;
  /**
   * The client secret of the account being used.
   */
  secret: string;
  /**
   * The key time of the `key` being used.
   */
  keyTime: number;
  /**
   * The key of the map to connect to.
   */
  key: number[];
  /**
   * > Unknown.
   */
  mapJSON: string;
  /**
   * > Unknown.
   */
  entryTag: string;
  /**
   * > Unknown.
   */
  gameNet: string;
  /**
   * > Unknown.
   */
  gameNetUserId: string;
  /**
   * > Unknown.
   */
  playPlatform: string;
  /**
   * > Unknown.
   */
  platformToken: string;
  /**
   * > Unknown.
   */
  userToken: string;
  /**
   * A random string which is appended to the end of the hello packet.
   */
  trailer: string;
  /**
   * The connection guid of the last map info packet.
   */
  previousConnectionGuid: string;
  //#endregion

  constructor() {
    this.buildVersion = '';
    this.gameId = 0;
    this.guid = '';
    this.random1 = 0;
    this.password = '';
    this.random2 = 0;
    this.secret = '';
    this.keyTime = 0;
    this.key = [];
    this.mapJSON = '';
    this.entryTag = '';
    this.gameNet = '';
    this.gameNetUserId = '';
    this.playPlatform = '';
    this.platformToken = '';
    this.userToken = '';
    this.trailer = '';
    this.previousConnectionGuid = '';
  }

  write(writer: Writer): void {
    writer.writeString(this.buildVersion);
    writer.writeInt32(this.gameId);
    writer.writeString(this.guid);
    writer.writeInt32(this.random1);
    writer.writeString(this.password);
    writer.writeInt32(this.random2);
    writer.writeString(this.secret);
    writer.writeInt32(this.keyTime);
    writer.writeByteArray(this.key);
    writer.writeStringUTF32(this.mapJSON);
    writer.writeString(this.entryTag);
    writer.writeString(this.gameNet);
    writer.writeString(this.gameNetUserId);
    writer.writeString(this.playPlatform);
    writer.writeString(this.platformToken);
    writer.writeString(this.userToken);
    writer.writeString(this.trailer);
    writer.writeString(this.previousConnectionGuid);
  }

  read(reader: Reader): void {
    this.buildVersion = reader.readString();
    this.gameId = reader.readInt32();
    this.guid = reader.readString();
    this.random1 = reader.readInt32();
    this.password = reader.readString();
    this.random2 = reader.readInt32();
    this.secret = reader.readString();
    this.keyTime = reader.readInt32();
    this.key = reader.readByteArray();
    this.mapJSON = reader.readStringUTF32();
    this.entryTag = reader.readString();
    this.gameNet = reader.readString();
    this.gameNetUserId = reader.readString();
    this.playPlatform = reader.readString();
    this.platformToken = reader.readString();
    this.userToken = reader.readString();
    this.trailer = reader.readString();
    this.previousConnectionGuid = reader.readString();
  }
}
