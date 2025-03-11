import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { Point, Vertices, Zone } from '@tetragons/shared';
import { filter, tap, withLatestFrom } from 'rxjs';
import { AppService } from './app.service';
import { AppStore } from './app.store';
import { OverlayComponent } from './overlay/overlay.component';
import { ZoneFormComponent } from './zone-form/zone-form.component';
import { drawZones } from './canvas.utils';

@Component({
  imports: [CommonModule, RouterModule, OverlayComponent, ZoneFormComponent],
  providers: [AppService, AppStore],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { read: ElementRef, static: true })
  public canvasChild!: ElementRef;
  public get canvas(): HTMLCanvasElement {
    return this.canvasChild.nativeElement as HTMLCanvasElement;
  }

  public loadingImage = true;

  constructor(public store: AppStore, public service: AppService) {
    this.store.zones$
      .pipe(
        filter(Boolean),
        withLatestFrom(this.service.loadImage()),
        tap(() => (this.loadingImage = false)),
        takeUntilDestroyed()
      )
      .subscribe(([zones, image]) => {
        const context = this.canvas.getContext('2d');

        const { width, height } = this.canvas;

        if (context) {
          context.reset();

          context.imageSmoothingEnabled = false;

          context.drawImage(image, 0, 0, width, height);

          drawZones(context, { width, height }, zones);
        }
      });
  }

  public ngOnInit(): void {
    this.service.loadData();
  }

  public async ngAfterViewInit() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }

  public zonePoints(data: Zone): string {
    return `[${data.points.map(([x, y]) => `(${x}, ${y})`).join(', ')}]`;
  }
}
