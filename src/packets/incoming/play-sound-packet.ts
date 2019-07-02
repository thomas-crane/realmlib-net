import { Writer } from '../../writer';
import { Reader } from '../../reader';
import { PacketType } from '../../packet-type';
import { Packet } from '../../packet';

/**
 * Received to tell the client to play a sound.
 */
export class PlaySoundPacket implements Packet {

  type = PacketType.PLAYSOUND;
  propagate = true;

  //#region packet-specific members
  /**
   * The object id of the origin of the sound.
   */
  ownerId: number;
  /**
   * The id of the sound to play.
   */
  soundId: number;
  //#endregion

  read(reader: Reader): void {
    this.ownerId = reader.readInt32();
    this.soundId = reader.readUnsignedByte();
  }

  write(writer: Writer): void {
    writer.writeInt32(this.ownerId);
    writer.writeUnsignedByte(this.soundId);
  }
}
