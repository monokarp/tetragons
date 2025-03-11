import { Injectable } from '@angular/core';
import { ZoneData } from '@tetragons/shared';
import { AppStore } from './app.store';
import { ZoneRepository } from './zone.repo';

@Injectable()
export class AppService {
  constructor(private store: AppStore, private repo: ZoneRepository) {}

  public async loadData(): Promise<void> {
    this.store.zones$.next(await this.withOverlay(() => this.repo.all()));
  }

  public async createZone(data: ZoneData): Promise<void> {
    const zones = this.store.zones$.getValue();

    if (!zones) {
      throw new Error('Create zone called with an empty store');
    }

    this.store.zones$.next(
      zones.concat(await this.withOverlay(() => this.repo.create(data)))
    );
  }

  public async deleteZone(id: string): Promise<void> {
    const zones = this.store.zones$.getValue();

    if (!zones) {
      throw new Error('Delete zone called with an empty store');
    }

    await this.withOverlay(() => this.repo.delete(id));

    this.store.zones$.next(zones.filter((one) => one.id !== id));
  }

  private async withOverlay<T>(action: () => Promise<T>): Promise<T> {
    this.store.isLoading$.next(true);

    const result = await action();

    this.store.isLoading$.next(false);

    return result;
  }
}
