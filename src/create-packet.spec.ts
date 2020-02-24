import test from 'ava';
import { createPacket } from './create-packet';
import { PacketType } from './packet-type';
import { OtherHitPacket } from './packets';

test('createPacket should return a packet of the correct type.', (t) => {
  const packet = createPacket(PacketType.OTHERHIT);
  t.true(packet instanceof OtherHitPacket);
});
