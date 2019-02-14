import { expect } from 'chai';
import 'mocha';

import { Packets, PacketType, CreateSuccessPacket } from '../src';

describe('Packets', () => {
  describe('#create()', () => {
    it('should throw a TypeError for invalid inputs.', () => {
      expect(() => Packets.create(1234 as any)).to.throw(TypeError);
      expect(() => Packets.create(null)).to.throw(TypeError);
      expect(() => Packets.create(['hello', 'world'] as any)).to.throw(TypeError);
    });
    it('should throw an Error for invalid packet types.', () => {
      expect(() => Packets.create('FAKE_PACKET' as PacketType)).to.throw(Error);
    });
    it('should create a packet of the correct type.', () => {
      const packet = Packets.create(PacketType.CREATE_SUCCESS);
      expect(packet).instanceof(CreateSuccessPacket, 'Incorrect packet type created.');
    });
  });
});
