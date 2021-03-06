// Note that we're vendoring this library and its typings because using it directly
// via NPM raised issues about not being able to import ES Modules, which has always
// led to nightmares for me, so I'm just vendoring this for now.

// Typings taken from:
// https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/bezier-js/index.d.ts

interface Point {
  x: number;
  y: number;
  z?: number;
}
interface Projection extends Point {
  t?: number;
  d?: number;
}
interface Inflection {
  x: number[];
  y: number[];
  z?: number[];
  values: number[];
}
interface Offset extends Point {
  c: Point;
  n: Point;
}
interface Pair {
  left: Bezier;
  right: Bezier;
}
interface Split extends Pair {
  span: Point[];
  _t1?: number;
  _t2?: number;
}
interface MinMax {
  min: number;
  mid?: number;
  max: number;
  size?: number;
}
interface BBox {
  x: MinMax;
  y: MinMax;
  z?: MinMax;
}
interface Line {
  p1: Point;
  p2: Point;
}
interface Arc extends Point {
  e: number;
  r: number;
  s: number;
  interval: { start: number; end: number };
}
interface Shape {
  startcap: BezierCap;
  forward: Bezier;
  back: Bezier;
  endcap: BezierCap;
  bbox: BBox;
  intersections: (shape: Shape) => string[][] | number[][];
}
interface ABC {
  A: Point;
  B: Point;
  C: Point;
}
interface Closest {
  mdist: number;
  mpos: number;
}
/**
 * Bezier curve constructor. The constructor argument can be one of three things:
 *
 * 1. array/4 of {x:..., y:..., z:...}, z optional
 * 2. numerical array/8 ordered x1,y1,x2,y2,x3,y3,x4,y4
 * 3. numerical array/12 ordered x1,y1,z1,x2,y2,z2,x3,y3,z3,x4,y4,z4
 *
 */
export class Bezier {
  private _linear;
  clockwise: boolean;
  _3d: boolean;
  _t1: number;
  _t2: number;
  _lut: Point[];
  dpoints: Point[][];
  order: number;
  points: Point[];
  dims: string[];
  dimlen: number;
  constructor(points: Point[]);
  constructor(coords: number[]);
  constructor(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4?: number,
    y4?: number
  );
  constructor(p1: Point, p2: Point, p3: Point, p4?: Point);
  static fromSVG(svgString: string): Bezier;
  static getABC(n: number, S: Point, B: Point, E: Point, t: number): ABC;
  static quadraticFromPoints(
    p1: Point,
    p2: Point,
    p3: Point,
    t?: number
  ): Bezier;
  static cubicFromPoints(
    S: Point,
    B: Point,
    E: Point,
    t?: number,
    d1?: number
  ): Bezier;
  static getUtils(): typeof utils;
  getUtils(): typeof utils;
  valueOf(): string;
  toString(): string;
  toSVG(): string;
  update(): void;
  computedirection(): void;
  length(): number;
  getLUT(steps?: number): Point[];
  on(point: Point, error: number): number;
  project(point: Point): Projection;
  get(t: number): Point;
  point(idx: number): Point;
  compute(t: number): Point;
  raise(): Bezier;
  derivative(t: number): Point;
  inflections(): number[];
  normal(t: number): Point;
  private __normal2(t);
  private __normal3(t);
  private __normal(t);
  hull(t: number): Point[];
  split(t1: number): Split;
  split(t1: number, t2: number): Bezier;
  extrema(): Inflection;
  bbox(): BBox;
  overlaps(curve: Bezier): boolean;
  offset(t: number, d?: number): Offset | Bezier[];
  simple(): boolean;
  reduce(): Bezier[];
  scale(d: Function): Bezier;
  scale(d: number): Bezier;
  outline(d1: number, d2?: number, d3?: number, d4?: number): PolyBezier;
  outlineshapes(
    d1: number,
    d2: number,
    curveIntersectionThreshold?: number
  ): Shape[];
  intersects(
    curve: Bezier,
    curveIntersectionThreshold?: number
  ): string[] | number[];
  intersects(curve: Line): string[] | number[];
  lineIntersects(line: Line): number[];
  selfintersects(curveIntersectionThreshold?: number): string[];
  curveintersects(
    c1: Bezier[],
    c2: Bezier[],
    curveIntersectionThreshold?: number
  ): string[];
  arcs(errorThreshold?: number): Arc[];
  private _error(pc, np1, s, e);
  private _iterate(errorThreshold, circles);
}
class BezierCap extends Bezier {
  virtual: boolean;
}
