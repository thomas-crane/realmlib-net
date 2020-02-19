import test from 'ava';
import { WorldPosData } from './world-pos-data';

test('New instances are at the origin', (t) => {
  const p = new WorldPosData();
  t.is(p.x, 0);
  t.is(p.y, 0);
});

test('New instances use the provided args', (t) => {
  const p = new WorldPosData(10, 20);
  t.is(p.x, 10);
  t.is(p.y, 20);
});

test('squareDistanceTo is correct', (t) => {
  const a = new WorldPosData();
  const b = new WorldPosData(3, 4);
  t.is(a.squareDistanceTo(b), 25);
});

test('distanceTo is correct', (t) => {
  const a = new WorldPosData();
  const b = new WorldPosData(3, 4);
  t.is(a.distanceTo(b), 5);
});

test('clone should return a point at the same coordinates', (t) => {
  const a = new WorldPosData(10, 20);
  const b = a.clone();
  t.is(b.x, a.x);
  t.is(b.y, a.y);
});

test('clone should not reference the original point', (t) => {
  const a = new WorldPosData(10, 20);
  const b = a.clone();
  t.not(a, b);
});
