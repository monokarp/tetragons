import { Injectable } from '@nestjs/common';
import { Zone, ZoneData } from '@tetragons/shared';
import { v4 as uuid } from 'uuid';

const delayMs = 1500;

function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

@Injectable()
export class ZoneRepository {
  private state: Zone[] = [
    {
      id: '1',
      name: 'Zone 1',
      points: [
        [12.3, 12.0],
        [16.3, 12.0],
        [16.3, 8.0],
        [11.4, 8.7],
      ],
    },
    {
      id: '2',
      name: 'Zone 2',
      points: [
        [-10.5, 9.0],
        [-14.5, 9.0],
        [-14.5, 5.0],
        [-9.6, 5.7],
      ],
    },
    {
      id: '3',
      name: 'Zone 3',
      points: [
        [-11.0, -7.5],
        [-15.0, -7.5],
        [-15.0, -11.5],
        [-10.1, -10.8],
      ],
    },
    {
      id: '4',
      name: 'Zone 4',
      points: [
        [9.8, -8.2],
        [13.8, -8.2],
        [13.8, -12.2],
        [8.9, -11.5],
      ],
    },
    {
      id: '5',
      name: 'Zone 5',
      points: [
        [1.0, 1.5],
        [3.0, 1.5],
        [3.0, -0.5],
        [0.5, -0.2],
      ],
    },
  ];

  public all(): Promise<Zone[]> {
    return new Promise((res) =>
      setTimeout(() => res(clone(this.state)), delayMs)
    );
  }

  public create(data: ZoneData): Promise<Zone> {
    const zone = Object.assign(clone(data), {
      id: uuid(),
    });

    this.state.push(zone);

    return new Promise((res) => setTimeout(() => res(clone(zone)), delayMs));
  }

  public delete(id: string): Promise<void> {
    this.state = this.state.filter((item) => item.id !== id);

    return new Promise((res) => setTimeout(() => res(), delayMs));
  }
}
