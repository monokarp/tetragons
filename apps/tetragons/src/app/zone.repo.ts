import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Zone, ZoneData } from '@tetragons/shared';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ZoneRepository {
  private readonly endpointUrl = `${environment.ApiUrl}/zone`;

  constructor(private http: HttpClient) {}

  public all(): Promise<Zone[]> {
    return firstValueFrom(this.http.get<Zone[]>(this.endpointUrl));
  }

  public create(data: ZoneData): Promise<Zone> {
    return firstValueFrom(this.http.put<Zone>(this.endpointUrl, data));
  }

  public async delete(id: string): Promise<void> {
    await firstValueFrom(this.http.delete<Zone[]>(`${this.endpointUrl}/${id}`));
  }
}
