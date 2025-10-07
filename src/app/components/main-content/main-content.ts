import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Page } from "../page/page";
import { RouterOutlet } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NzLayoutModule,
    NzIconModule,
    NzDropDownModule,
    NzMenuModule,
    RouterOutlet
],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {
  isCollapsed: boolean = false;
  isUp: boolean = false;

  // stylingFunction(): void {
  //   this.isCollapsed = true;
  // }
}

