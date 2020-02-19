import { SlotObjectData } from '../../../data';
import { PetUpgradePaymentType } from '../../../models/pet-upgrade-payment-type';
import { Packet } from '../../../packet';
import { PacketType } from '../../../packet-type';
import { Reader } from '../../../reader';
import { Writer } from '../../../writer';

/**
 * Sent to upgrade (feed) a pet.
 */
export class PetUpgradeRequestPacket implements Packet {

  readonly type = PacketType.PETUPGRADEREQUEST;
  propagate = true;

  //#region packet-specific members
  /**
   * > Unknown.
   */
  petTransType: number;
  /**
   * > Unknown.
   */
  pIdOne: number;
  /**
   * > Unknown.
   */
  pIdTwo: number;
  /**
   * > Unknown.
   */
  objectId: number;
  /**
   * The items which will be used to upgrade the pet.
   */
  slotObjects: SlotObjectData[];
  /**
   * The type of currency which will be used to purchase the upgrade.
   */
  paymentType: PetUpgradePaymentType;
  //#endregion

  constructor() {
    this.petTransType = 0;
    this.pIdOne = 0;
    this.pIdTwo = 0;
    this.objectId = 0;
    this.slotObjects = [];
    this.paymentType = 0;
  }

  write(writer: Writer): void {
    writer.writeByte(this.petTransType);
    writer.writeInt32(this.pIdOne);
    writer.writeInt32(this.pIdTwo);
    writer.writeInt32(this.objectId);
    writer.writeByte(this.paymentType);
    writer.writeShort(this.slotObjects.length);
    for (const slotObject of this.slotObjects) {
      slotObject.write(writer);
    }
  }

  read(reader: Reader): void {
    this.petTransType = reader.readByte();
    this.pIdOne = reader.readInt32();
    this.pIdTwo = reader.readInt32();
    this.objectId = reader.readInt32();
    this.paymentType = reader.readByte();
    const slotObjectLen = reader.readShort();
    this.slotObjects = new Array<SlotObjectData>(slotObjectLen);
    for (let i = 0; i < slotObjectLen; i++) {
      this.slotObjects[i] = new SlotObjectData();
      this.slotObjects[i].read(reader);
    }
  }
}
