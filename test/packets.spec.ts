import { expect } from 'chai';
import 'mocha';

import { createPacket, PacketType, CreateSuccessPacket } from '../src';

describe('#createPacket()', () => {
  it('should throw a TypeError for invalid inputs.', () => {
    expect(() => createPacket(1234 as any)).to.throw(TypeError);
    expect(() => createPacket(null)).to.throw(TypeError);
    expect(() => createPacket(['hello', 'world'] as any)).to.throw(TypeError);
  });
  it('should throw an Error for invalid packet types.', () => {
    expect(() => createPacket('FAKE_PACKET' as PacketType)).to.throw(Error);
  });
  it('should create a packet of the correct type.', () => {
    const packet = createPacket(PacketType.CREATE_SUCCESS);
    expect(packet).instanceof(CreateSuccessPacket, 'Incorrect packet type created.');
  });
});
