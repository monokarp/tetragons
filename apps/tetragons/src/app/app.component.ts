import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from './app.service';
import { AppStore } from './app.store';
import { OverlayComponent } from './overlay/overlay.component';
import { ZoneFormComponent } from './zone-form/zone-form.component';
import { CommonModule } from '@angular/common';

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

  constructor(public store: AppStore, public service: AppService) {}

  public ngOnInit(): void {
    this.service.loadData();
  }

  public async ngAfterViewInit() {
    const context = this.canvas.getContext('2d');

    if (context) {
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;

      context.drawImage(
        await this.service.loadImage(),
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      this.loadingImage = false;
    }
  }
}
