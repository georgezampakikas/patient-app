import { Component, inject, OnInit } from '@angular/core';

import { NzTableComponent, NzTableModule } from "ng-zorro-antd/table";

import { map, take } from 'rxjs';

import { UserService } from '../../shared/user-service';
import { LabTestDto } from '../../shared/patient-modal';
import { NsAutoHeightTableDirective } from "../../directives/ns-auto-height-table";

@Component({
  selector: 'app-settings',
  imports: [
    NzTableModule,
    NsAutoHeightTableDirective
],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings implements OnInit {
  labTests: LabTestDto[] = [];
  
  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getLabTests()
    .pipe(take(1))
    .subscribe((res: LabTestDto[]) => this.labTests = res);
  }
}
