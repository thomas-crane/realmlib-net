import test from 'ava';
import { OUTGOING_KEY, RC4 } from './rc4';

test('cipher should be correct', (t) => {
  const rc4 = new RC4(OUTGOING_KEY);
  const buffer = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  // check first cipher.
  rc4.cipher(buffer);
  t.deepEqual(buffer, Buffer.from([102, 188, 238, 161, 120, 113, 23, 156, 203, 252]));

  // check second cipher.
  rc4.cipher(buffer);
  t.deepEqual(buffer, Buffer.from([188, 197, 237, 76, 146, 126, 146, 58, 116, 7]));
});

test('reset should clear the state of the cipher', (t) => {
  const rc4 = new RC4(OUTGOING_KEY);
  let buffer = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  // check first cipher.
  rc4.cipher(buffer);
  t.deepEqual(buffer, Buffer.from([102, 188, 238, 161, 120, 113, 23, 156, 203, 252]));

  // reset, result should now be the same as the first cipher.
  buffer = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  rc4.reset();
  rc4.cipher(buffer);
  t.deepEqual(buffer, Buffer.from([102, 188, 238, 161, 120, 113, 23, 156, 203, 252]));
});
