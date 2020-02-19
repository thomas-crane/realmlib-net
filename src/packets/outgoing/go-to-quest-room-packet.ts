import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';

/**
 * Sent to prompt the server to send a `ReconnectPacket` which
 * contains the reconnect information for the Quest Room.
 */
export class GoToQuestRoomPacket implements Packet {

  readonly type = PacketType.QUEST_ROOM_MSG;
  propagate = true;

  //#region packet-specific members

  //#endregion

  write(): void {
    //
  }

  read(): void {
    //
  }
}
