import { expect } from 'chai';
import 'mocha';

import { RC4, OUTGOING_KEY } from '../src';

describe('RC4', () => {
  it('should throw a TypeError for invalid constructor inputs.', () => {
    expect(() => new RC4(1234 as any)).to.throw(TypeError);
    expect(() => new RC4(null as any)).to.throw(TypeError);
  });
  describe('#cipher()', () => {
    it('should perform a correct inline cipher for valid inputs.', () => {
      const rc4 = new RC4(Buffer.from(OUTGOING_KEY, 'hex'));
      const buffer = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      rc4.cipher(buffer);
      expect([...buffer]).to.deep.equal([102, 188, 238, 161, 120, 113, 23, 156, 203, 252], 'Incorrect first mutation.');
      rc4.cipher(buffer);
      expect([...buffer]).to.deep.equal([188, 197, 237, 76, 146, 126, 146, 58, 116, 7], 'Incorrect second mutation.');
    });
  });
  describe('#reset()', () => {
    it('should reset the state of the RC4 instance.', () => {
      const rc4 = new RC4(Buffer.from(OUTGOING_KEY, 'hex'));
      let buffer = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      rc4.cipher(buffer);
      expect([...buffer]).to.deep.equal([102, 188, 238, 161, 120, 113, 23, 156, 203, 252], 'Incorrect first mutation.');
      buffer = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      rc4.reset();
      rc4.cipher(buffer);
      expect([...buffer]).to.deep.equal([102, 188, 238, 161, 120, 113, 23, 156, 203, 252], 'Incorrect second mutation.');
    });
  });
});
