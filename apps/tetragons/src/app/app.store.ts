import { Injectable } from '@angular/core';
import { Zone } from '@tetragons/shared';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppStore {
  public readonly zones$ = new BehaviorSubject<Zone[] | null>(null);

  public readonly isCreating$ = new BehaviorSubject(false);
  public readonly deletingZoneId$ = new BehaviorSubject<string | null>(null);
}
