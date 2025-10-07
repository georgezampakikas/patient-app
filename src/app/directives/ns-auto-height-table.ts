import {
  Directive,
  ElementRef,
  Input,
  SimpleChange,
  HostListener,
  ChangeDetectorRef,
  AfterViewInit,
  inject,
} from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';

@Directive({
  selector: '[appNsAutoHeightTable]',
})
export class NsAutoHeightTableDirective implements AfterViewInit {
  @Input('appNsAutoHeightTable')
  offset?: number;

  private element = inject(ElementRef);
  private table = inject(NzTableComponent<any>);
  private cd = inject(ChangeDetectorRef);

  @HostListener('window:resize')
  onResize() {
    this.doAutoSize();
  }

  ngAfterViewInit() {
    this.doAutoSize();
  }

  private doAutoSize() {
    setTimeout(() => {
      const offset = this.offset || 70;
      const el = this.element.nativeElement;

      if (el) {
        const viewportHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        const newHeight = viewportHeight - elementTop - offset;

        const originNzScroll = this.table.nzScroll ? { ...this.table.nzScroll } : null;
        this.table.nzScroll = {
          ...(this.table.nzScroll || {}),
          y: newHeight + 'px',
        };

        this.table.ngOnChanges({
          nzScroll: new SimpleChange(originNzScroll, this.table.nzScroll, false),
        });
        this.cd.detectChanges();
      }
    }, 10);
  }

}