import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { testIdAttrName } from '@tetragons/shared';

@Directive({ selector: '[appTestId]', standalone: true })
export class TestIdDirective implements OnInit {
  @Input() appTestId!: string;

  constructor(private el: ElementRef) {}

  public ngOnInit(): void {
    this.el.nativeElement.setAttribute(testIdAttrName, this.appTestId);
  }
}
