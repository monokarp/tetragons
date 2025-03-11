export interface Zone extends ZoneData {
  id: string;
}

export interface ZoneData {
  name: string;
  points: Vertices;
}

export type Vertices = [Vertex, Vertex, Vertex, Vertex];

export type Vertex = [number, number];
