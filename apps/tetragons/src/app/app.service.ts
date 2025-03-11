import { Injectable } from '@angular/core';
import { ZoneData } from '@tetragons/shared';
import { AppStore } from './app.store';
import { ZoneRepository } from './zone.repo';

@Injectable()
export class AppService {
  constructor(private store: AppStore, private repo: ZoneRepository) {}

  public async loadData(): Promise<void> {
    this.store.zones$.next(await this.repo.all());
  }

  public async createZone(data: ZoneData): Promise<void> {
    const zones = this.store.zones$.getValue();

    if (!zones) {
      throw new Error('Create zone called with an empty store');
    }

    this.store.isCreating$.next(true);

    this.store.zones$.next(zones.concat(await this.repo.create(data)));

    this.store.isCreating$.next(false);
  }

  public async deleteZone(id: string): Promise<void> {
    const zones = this.store.zones$.getValue();

    if (!zones) {
      throw new Error('Delete zone called with an empty store');
    }

    this.store.deletingZoneId$.next(id);

    await this.repo.delete(id);

    this.store.deletingZoneId$.next(null);

    this.store.zones$.next(zones.filter((one) => one.id !== id));
  }

  public async loadImage(): Promise<HTMLImageElement> {
    const img = new Image();

    img.src = 'https://picsum.photos/1920/1080';

    return new Promise((res, rej) => {
      const onload = () => {
        finalize();
        res(img);
      };

      const onerror = () => {
        finalize();
        rej(new Error('Failed to load image'));
      };

      img.addEventListener('load', onload, { once: true });

      img.addEventListener('error', onerror, {
        once: true,
      });

      function finalize() {
        img.removeEventListener('load', onload);
        img.removeEventListener('error', onerror);
      }
    });
  }
}
