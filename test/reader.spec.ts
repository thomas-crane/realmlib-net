import { expect } from 'chai';
import 'mocha';

import { Reader } from '../src';

describe('Reader', () => {
  describe('#length', () => {
    const reader = new Reader(10);
    it('should return the length of the packet buffer.', () => {
      expect(reader.length).to.equal(10, 'Initial length incorrect.');
    });
    it('should remain correct after the buffer is resized.', () => {
      reader.resizeBuffer(5);
      expect(reader.length).to.equal(5, 'Downsize length incorrect.');
      reader.resizeBuffer(15);
      expect(reader.length).to.equal(15, 'Upsize length incorrect.');
    });
  });
  describe('#remaining', () => {
    const reader = new Reader(20);
    it('should return the number of free bytes in the buffer.', () => {
      expect(reader.remaining).to.equal(20);
    });
    it('should remain correct after the buffer is filled.', () => {
      reader.index += reader.buffer.writeInt32BE(10, 0);
      expect(reader.remaining).to.equal(16);
    });
  });

  describe('#readInt32()', () => {
    const reader = new Reader(4);
    reader.buffer.writeInt32BE(52, 0);
    it('should read a big-endian int32 from the buffer.', () => {
      expect(reader.readInt32()).to.equal(52, 'Incorrectly read int32.');
    });
    it('should advance the buffer index by 4.', () => {
      expect(reader.index).to.equal(4);
    });
  });

  describe('#readUInt32()', () => {
    const reader = new Reader(4);
    reader.buffer.writeUInt32BE(8072, 0);
    it('should read a big-endian unsigned int32 from the buffer.', () => {
      expect(reader.readUInt32()).to.equal(8072, 'Incorrectly read unsigned int32.');
    });
    it('should advance the buffer index by 4.', () => {
      expect(reader.index).to.equal(4);
    });
  });

  describe('#readShort()', () => {
    const reader = new Reader(2);
    reader.buffer.writeInt16BE(762, 0);
    it('should read a big-endian unsigned int32 from the buffer.', () => {
      expect(reader.readShort()).to.equal(762, 'Incorrectly read int16.');
    });
    it('should advance the buffer index by 2.', () => {
      expect(reader.index).to.equal(2);
    });
  });

  describe('#readUnsignedShort()', () => {
    const reader = new Reader(2);
    reader.buffer.writeUInt16BE(1, 0);
    it('should read a big-endian unsigned int32 from the buffer.', () => {
      expect(reader.readUnsignedShort()).to.equal(1, 'Incorrectly read unsigned int16.');
    });
    it('should advance the buffer index by 2.', () => {
      expect(reader.index).to.equal(2);
    });
  });

  describe('#readByte()', () => {
    const reader = new Reader(1);
    reader.buffer.writeInt8(3, 0);
    it('should read an int8 from the buffer.', () => {
      expect(reader.readByte()).to.equal(3, 'Incorrectly read int8.');
    });
    it('should advance the buffer index by 1.', () => {
      expect(reader.index).to.equal(1);
    });
  });

  describe('#readUnsignedByte()', () => {
    const reader = new Reader(1);
    reader.buffer.writeUInt8(245, 0);
    it('should read an unsigned int8 from the buffer.', () => {
      expect(reader.readUnsignedByte()).to.equal(245, 'Incorrectly read unsigned int8.');
    });
    it('should advance the buffer index by 1.', () => {
      expect(reader.index).to.equal(1);
    });
  });

  describe('#readBoolean()', () => {
    const reader = new Reader(1);
    reader.buffer.writeInt8(0, 0);
    it('should read a boolean from the buffer.', () => {
      expect(reader.readBoolean()).to.equal(false, 'Incorrectly read boolean.');
    });
    it('should advance the buffer index by 1.', () => {
      expect(reader.index).to.equal(1);
    });
  });

  describe('#readFloat()', () => {
    const reader = new Reader(4);
    reader.buffer.writeFloatBE(6.23214, 0);
    it('should read a float32 from the buffer.', () => {
      expect(reader.readFloat()).to.be.closeTo(6.23214, 0.000001, 'Incorrectly read float32.');
    });
    it('should advance the buffer index by 4.', () => {
      expect(reader.index).to.equal(4);
    });
  });

  describe('#readByteArray()', () => {
    const reader = new Reader(6);
    reader.buffer.writeInt16BE(4, 0);
    reader.buffer.writeInt8(4, 2);
    reader.buffer.writeInt8(1, 3);
    reader.buffer.writeInt8(29, 4);
    reader.buffer.writeInt8(123, 5);
    const byteArray = reader.readByteArray();
    it('should read the length header correctly.', () => {
      expect(byteArray.length).to.equal(4, 'Incorrect length header read.');
    });
    it('should read the correct bytes from the buffer.', () => {
      expect(byteArray[0]).to.equal(4, 'Incorrect 1st element.');
      expect(byteArray[1]).to.equal(1, 'Incorrect 2nd element.');
      expect(byteArray[2]).to.equal(29, 'Incorrect 3rd element.');
      expect(byteArray[3]).to.equal(123, 'Incorrect 4th element.');
    });
    it('should advance the buffer index by 2 + the number of elements.', () => {
      expect(reader.index).to.equal(6);
    });
  });

  describe('#readString()', () => {
    const reader = new Reader(8);
    reader.buffer.writeInt16BE(6, 0);
    Buffer.from('World!').copy(reader.buffer, 2);
    const str = reader.readString();
    it('should read the length header correctly.', () => {
      expect(str.length).to.equal(6, 'Incorrect length header read.');
    });
    it('should read a string from the buffer.', () => {
      expect(str).to.equal('World!', 'Incorrectly read string.');
    });
    it('should advance the buffer index by 2 + the length of the string.', () => {
      expect(reader.index).to.equal(8);
    });
  });

  describe('#readStringUTF32()', () => {
    const reader = new Reader(8);
    reader.buffer.writeInt32BE(4, 0);
    Buffer.from('1234').copy(reader.buffer, 4);
    const str = reader.readStringUTF32();
    it('should read the length header correctly.', () => {
      expect(str.length).to.equal(4, 'Incorrect length header read.');
    });
    it('should read a string from the buffer.', () => {
      expect(str).to.equal('1234', 'Incorrectly read string.');
    });
    it('should advance the buffer index by 4 + the length of the string.', () => {
      expect(reader.index).to.equal(8);
    });
  });

  describe('#resize()', () => {
    const reader = new Reader(10);
    Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).copy(reader.buffer);
    it('should change the length of the buffer.', () => {
      reader.resizeBuffer(5);
      expect(reader.length).to.equal(5, 'New length incorrect.');
    });
    it('should not change the actual buffer length if the new length is smaller.', () => {
      expect(reader.buffer.length).to.equal(10, 'New buffer length incorrect.');
    });
    it('should not affect the buffer contents.', () => {
      expect([...reader.buffer]).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'New contents incorrect.');
    });
    it('should increase the actual buffer when required.', () => {
      reader.resizeBuffer(15);
      expect(reader.buffer.length).to.equal(15, 'New buffer length incorrect.');
    });
  });
  describe('#reset()', () => {
    const reader = new Reader(100);
    reader.buffer.write('Example data');
    reader.reset();
    it('should reset the buffer index.', () => {
      expect(reader.index).to.equal(0, 'Buffer index not reset.');
    });
    it('should reset the data buffer', () => {
      expect(reader.buffer.length).to.equal(Reader.DEFAULT_SIZE, 'Data buffer not reset.');
    });
    it('should ensure the length stays correct.', () => {
      expect(reader.length).to.equal(reader.buffer.length, 'New length incorrect.');
    });
  });
});
