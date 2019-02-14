import { expect } from 'chai';
import 'mocha';

import { Point } from '../src';

describe('Point', () => {
  it('should be initialised at the origin if no args are provided.', () => {
    const p = new Point();
    expect(p.x).to.equal(0, 'Incorrect initial x.');
    expect(p.y).to.equal(0, 'Incorrect initial y.');
  });
  it('should be initialised at the provided args.', () => {
    const p = new Point(3, 4);
    expect(p.x).to.equal(3, 'Incorrect initial x.');
    expect(p.y).to.equal(4, 'Incorrect initial y.');
  });
  describe('#squareDistanceTo()', () => {
    it('should return the correct squared distance for valid inputs.', () => {
      const a = new Point();
      const b = new Point(3, 4);
      expect(a.squareDistanceTo(b)).to.equal(25, 'Incorrect result for squareDistanceTo.');
    });
    it('should throw a TypeError for invalid inputs.', () => {
      const a = new Point();
      expect(() => a.squareDistanceTo(421 as any)).to.throw(TypeError);
      expect(() => a.squareDistanceTo('Test' as any)).to.throw(TypeError);
      expect(() => a.squareDistanceTo(null)).to.throw(TypeError);
    });
  });
  describe('#distanceTo()', () => {
    it('should return the correct distance for valid inputs.', () => {
      const a = new Point();
      const b = new Point(3, 4);
      expect(a.distanceTo(b)).to.equal(5, 'Incorrect result for distanceTo.');
    });
    it('should throw a TypeError for invalid inputs.', () => {
      const a = new Point();
      expect(() => a.distanceTo(8231 as any)).to.throw(TypeError);
      expect(() => a.distanceTo('Hello, World!' as any)).to.throw(TypeError);
      expect(() => a.distanceTo(null)).to.throw(TypeError);
    });
  });
  describe('#clone()', () => {
    const a = new Point(10, 23);
    const b = a.clone();
    it('should return a new point with the same coordinates.', () => {
      expect(b.x).to.equal(a.x, 'Incorrect x value.');
      expect(b.y).to.equal(a.y, 'Incorrect y value.');
    });
    it('should not reference the original point.', () => {
      a.x = 32;
      a.y = 54;
      expect(b.x).not.to.equal(a.x, 'Cloned point references original.');
      expect(b.y).not.to.equal(a.y, 'Cloned point references original.');
    });
  });
});
