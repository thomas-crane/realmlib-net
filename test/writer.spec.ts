import { expect } from 'chai';
import 'mocha';

import { Writer } from '../src';

describe('Writer', () => {
  describe('#writeInt32()', () => {
    const writer = new Writer();
    it('should write a big-endian int32 to the buffer.', () => {
      writer.writeInt32(52);
      expect(writer.buffer.readInt32BE(0)).to.equal(52, 'Incorrectly wrote int32.');
    });
    it('should advance the buffer index by 4.', () => {
      expect(writer.index).to.equal(4);
    });
    it('should write a default value for invalid inputs.', () => {
      writer.index = 0;
      writer.writeInt32(null);
      expect(writer.buffer.readInt32BE(0)).to.equal(0, 'Null caused non-default value for int32.');
      writer.index = 0;
      writer.writeInt32('hello' as any);
      expect(writer.buffer.readInt32BE(0)).to.equal(0, 'String caused non-default value for int32.');
    });
  });

  describe('#writeUInt32()', () => {
    const writer = new Writer();
    it('should write a big-endian unsigned int32 to the buffer.', () => {
      writer.writeUInt32(1432);
      expect(writer.buffer.readInt32BE(0)).to.equal(1432, 'Incorrectly wrote unsigned int32.');
    });
    it('should advance the buffer index by 4.', () => {
      expect(writer.index).to.equal(4);
    });
    it('should write a default value for invalid inputs.', () => {
      writer.index = 0;
      writer.writeUInt32(null);
      expect(writer.buffer.readUInt32BE(0)).to.equal(0, 'Null caused non-default value for unsigned int32.');
      writer.index = 0;
      writer.writeUInt32('hello' as any);
      expect(writer.buffer.readUInt32BE(0)).to.equal(0, 'String caused non-default value for unsigned int32.');
    });
  });

  describe('#writeShort()', () => {
    const writer = new Writer();
    it('should write a big-endian int16 to the buffer.', () => {
      writer.writeShort(352);
      expect(writer.buffer.readInt16BE(0)).to.equal(352, 'Incorrectly wrote int16.');
    });
    it('should advance the buffer index by 2.', () => {
      expect(writer.index).to.equal(2);
    });
    it('should write a default value for invalid inputs.', () => {
      writer.index = 0;
      writer.writeShort(null);
      expect(writer.buffer.readInt16BE(0)).to.equal(0, 'Null caused non-default value for int16.');
      writer.index = 0;
      writer.writeShort('hello' as any);
      expect(writer.buffer.readInt16BE(0)).to.equal(0, 'String caused non-default value for int16.');
    });
  });

  describe('#writeUnsignedShort()', () => {
    const writer = new Writer();
    it('should write a big-endian int16 to the buffer.', () => {
      writer.writeUnsignedShort(24);
      expect(writer.buffer.readUInt16BE(0)).to.equal(24, 'Incorrectly wrote unsigned int16.');
    });
    it('should advance the buffer index by 2.', () => {
      expect(writer.index).to.equal(2);
    });
    it('should write a default value for invalid inputs.', () => {
      writer.index = 0;
      writer.writeUnsignedShort(null);
      expect(writer.buffer.readUInt16BE(0)).to.equal(0, 'Null caused non-default value for unsigned int16.');
      writer.index = 0;
      writer.writeUnsignedShort('hello' as any);
      expect(writer.buffer.readUInt16BE(0)).to.equal(0, 'String caused non-default unsigned value for int16.');
    });
  });

  describe('#writeByte()', () => {
    const writer = new Writer();
    it('should write an int8 to the buffer.', () => {
      writer.writeByte(14);
      expect(writer.buffer.readInt8(0)).to.equal(14, 'Incorrectly wrote int8.');
    });
    it('should advance the buffer index by 1.', () => {
      expect(writer.index).to.equal(1);
    });
    it('should write a default value for invalid inputs.', () => {
      writer.index = 0;
      writer.writeByte(null);
      expect(writer.buffer.readInt8(0)).to.equal(0, 'Null caused non-default value for int8.');
      writer.index = 0;
      writer.writeByte('hello' as any);
      expect(writer.buffer.readInt8(0)).to.equal(0, 'String caused non-default value for int8.');
    });
  });

  describe('#writeUnsignedByte()', () => {
    const writer = new Writer();
    it('should write an unsigned int8 to the buffer.', () => {
      writer.writeUnsignedByte(14);
      expect(writer.buffer.readUInt8(0)).to.equal(14, 'Incorrectly wrote unsigned int8.');
    });
    it('should advance the buffer index by 1.', () => {
      expect(writer.index).to.equal(1);
    });
    it('should write a default value for invalid inputs.', () => {
      writer.index = 0;
      writer.writeUnsignedByte(null);
      expect(writer.buffer.readUInt8(0)).to.equal(0, 'Null caused non-default value for unsigned int8.');
      writer.index = 0;
      writer.writeUnsignedByte('hello' as any);
      expect(writer.buffer.readUInt8(0)).to.equal(0, 'String caused non-default value for unsigned int8.');
    });
  });

  describe('#writeBoolean()', () => {
    const writer = new Writer();
    it('should write a boolean to the buffer.', () => {
      writer.writeBoolean(true);
      expect(writer.buffer.readInt8(0)).to.equal(1, 'Incorrectly wrote boolean.');
    });
    it('should advance the buffer index by 1.', () => {
      expect(writer.index).to.equal(1);
    });
    it('should write a default value for invalid inputs.', () => {
      writer.index = 0;
      writer.writeBoolean(null);
      expect(writer.buffer.readInt8(0)).to.equal(0, 'Null caused non-default value for boolean.');
      writer.index = 0;
      writer.writeBoolean('hello' as any);
      expect(writer.buffer.readInt8(0)).to.equal(0, 'String caused non-default value for boolean.');
    });
  });
  describe('#writeFloat()', () => {
    const writer = new Writer();
    it('should write a float32 to the buffer.', () => {
      writer.writeFloat(3.14159);
      expect(writer.buffer.readFloatBE(0)).to.be.closeTo(3.14159, 0.000001, 'Incorrectly wrote float32.');
    });
    it('should advance the buffer index by 4.', () => {
      expect(writer.index).to.equal(4);
    });
    it('should write a default value for invalid inputs.', () => {
      writer.index = 0;
      writer.writeFloat(null);
      expect(writer.buffer.readFloatBE(0)).to.equal(0, 'Null caused non-default value for float32.');
      writer.index = 0;
      writer.writeFloat('hello' as any);
      expect(writer.buffer.readFloatBE(0)).to.equal(0, 'String caused non-default value for float32.');
    });
  });

  describe('#writeByteArray()', () => {
    const writer = new Writer();
    it('should write the length header to the buffer.', () => {
      writer.writeByteArray([1, 3, 5, 7]);
      expect(writer.buffer.readInt16BE(0)).to.equal(4, 'Incorrectly wrote length header.');
    });
    it('should write the correct elements', () => {
      expect(writer.buffer.readInt8(2)).to.equal(1, 'Incorrect 1st element.');
      expect(writer.buffer.readInt8(3)).to.equal(3, 'Incorrect 2nd element.');
      expect(writer.buffer.readInt8(4)).to.equal(5, 'Incorrect 3rd element.');
      expect(writer.buffer.readInt8(5)).to.equal(7, 'Incorrect 4th element.');
    });
    it('should advance the buffer index by 2 + the number of elements.', () => {
      expect(writer.index).to.equal(6);
    });
    it('should write a default value for invalid inputs.', () => {
      writer.index = 0;
      writer.writeByteArray(null);
      expect(writer.buffer.readInt16BE(0)).to.equal(0, 'Null caused non-default value for byte array length header.');
      writer.index = 0;
      writer.writeByteArray('hello' as any);
      expect(writer.buffer.readInt16BE(0)).to.equal(0, 'String caused non-default value for byte array length header.');
    });
  });

  describe('#writeString()', () => {
    const writer = new Writer();
    it('should write the length header to the buffer.', () => {
      writer.writeString('Hello,');
      expect(writer.buffer.readInt16BE(0)).to.equal(6, 'Incorrectly wrote length header.');
    });
    it('should write a string to the buffer.', () => {
      expect(writer.buffer.slice(2).toString('utf8')).to.equal('Hello,', 'Incorrectly wrote string.');
    });
    it('should advance the buffer index by 2 + the length of the string.', () => {
      expect(writer.index).to.equal(8);
    });
    it('should write a default value for invalid inputs.', () => {
      writer.index = 0;
      writer.writeString(null);
      expect(writer.buffer.readInt16BE(0)).to.equal(0, 'Null caused non-default value for string length header.');
      writer.index = 0;
      writer.writeString(4237 as any);
      expect(writer.buffer.readInt16BE(0)).to.equal(0, 'Number caused non-default value for string length header.');
    });
  });
  describe('#writeStringUTF32()', () => {
    const writer = new Writer();
    it('should write the length header to the buffer.', () => {
      writer.writeStringUTF32('Test');
      expect(writer.buffer.readInt32BE(0)).to.equal(4, 'Incorrectly wrote length header.');
    });
    it('should write a string to the buffer.', () => {
      expect(writer.buffer.slice(4).toString('utf8')).to.equal('Test', 'Incorrectly wrote utf32 string.');
    });
    it('should advance the buffer index by 4 + the length of the string.', () => {
      expect(writer.index).to.equal(8);
    });
    it('should write a default value for invalid inputs.', () => {
      writer.index = 0;
      writer.writeStringUTF32(null);
      expect(writer.buffer.readInt32BE(0)).to.equal(0, 'Null caused non-default value for utf32 string length header.');
      writer.index = 0;
      writer.writeStringUTF32(4237 as any);
      expect(writer.buffer.readInt32BE(0)).to.equal(0, 'Number caused non-default value for utf32 string length header.');
    });
  });
});
