import { Point, Vertices } from './zone.types';

export function sortByPolarAngle(points: Vertices): Vertices {
  const [ox, oy] = centroidOf(points);

  const polarAngle = ([x, y]: Point) => Math.atan2(y - oy, x - ox);

  return [...points].sort((a, b) => polarAngle(a) - polarAngle(b)) as Vertices;
}

export function centroidOf(points: Vertices): Point {
  let sumX = 0,
    sumY = 0;

  for (const [x, y] of points) {
    sumX += x;
    sumY += y;
  }

  const { length } = points;

  return [sumX / length, sumY / length];
}

export function maxShapeLengths(points: Vertices): [number, number] {
  const xCoords = [];
  const yCoords = [];

  for (const [x, y] of points) {
    xCoords.push(x);
    yCoords.push(y);
  }

  const length = (range: number[]) => Math.max(...range) - Math.min(...range);

  return [length(xCoords), length(yCoords)];
}
