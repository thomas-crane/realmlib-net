import { StatType } from '../models/stat-type';
import { DataPacket } from '../packet';
import { Reader } from '../reader';
import { Writer } from '../writer';

export class StatData implements DataPacket {
  /**
   * The type of stat.
   */
  statType = 0;
  /**
   * The number value of this stat, if this is not a string stat.
   */
  statValue: number;
  /**
   * The string value of this stat, if this is a string stat.
   */
  stringStatValue: string;

  read(reader: Reader): void {
    this.statType = reader.readUnsignedByte();
    if (this.isStringStat()) {
      this.stringStatValue = reader.readString();
    } else {
      this.statValue = reader.readInt32();
    }
  }

  write(writer: Writer): void {
    writer.writeByte(this.statType);
    if (this.isStringStat()) {
      writer.writeString(this.stringStatValue);
    } else {
      writer.writeInt32(this.statValue);
    }
  }

  private isStringStat(): boolean {
    switch (this.statType) {
      case StatType.NAME_STAT:
      case StatType.GUILD_NAME_STAT:
      case StatType.PET_NAME_STAT:
      case StatType.ACCOUNT_ID_STAT:
      case StatType.OWNER_ACCOUNT_ID_STAT:
        return true;
      default:
        return false;
    }
  }
}
