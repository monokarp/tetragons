export interface Zone extends ZoneData {
  id: string;
}

export interface ZoneData {
  name: string;
  points: Vertices;
}

export type Vertices = [Point, Point, Point, Point];

export type Point = [number, number];
