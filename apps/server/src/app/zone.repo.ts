import { Injectable } from '@nestjs/common';
import { Zone, ZoneData } from '@tetragons/shared';
import { v4 as uuid } from 'uuid';
import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout } from 'node:timers/promises';

const delayMs = 1500;

function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

@Injectable()
export class ZoneRepository {
  private readonly dataPath = './data';

  constructor() {
    mkdir(path.resolve(this.dataPath), { recursive: true });
  }

  public async all(): Promise<Zone[]> {
    const names = await readdir(path.resolve(this.dataPath));

    const contents: string[] = await Promise.all(
      names.map((one) =>
        readFile(path.resolve(this.dataPath, one), { encoding: 'utf8' })
      )
    );

    await this.delay();

    return contents.map((text) => JSON.parse(text) as Zone);
  }

  public async create(data: ZoneData): Promise<Zone> {
    const zone = Object.assign(clone(data), {
      id: uuid(),
    });

    await writeFile(
      path.resolve(this.dataPath, zone.id),
      JSON.stringify(zone),
      { flag: 'w+' }
    );

    await this.delay();

    return zone;
  }

  public async delete(id: string): Promise<void> {
    await this.delay();

    return unlink(path.resolve(this.dataPath, id));
  }

  private async delay(): Promise<void> {
    return setTimeout(delayMs);
  }
}
