import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';

import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableModule } from 'ng-zorro-antd/table';

import { NsAutoHeightTableDirective } from '../../directives/ns-auto-height-table';
import { LabTestsSectionsTable } from '../lab-tests-sections-table/lab-tests-sections-table';
import { LabTestV2Dto } from '../../shared/patient-modal';
import { PatientLabResultsTable } from "../patient-lab-results-table/patient-lab-results-table";
import { UserInfo } from "../user-info/user-info";
import { PatientDetailsCard } from "../patient-details-card/patient-details-card";
import { NzEmptyComponent } from "ng-zorro-antd/empty";
import { UserService } from '../../shared/user-service';
import { take } from 'rxjs';


@Component({
  selector: 'app-patient-details',
  imports: [
    PatientDetailsCard,
    NzTabsModule,
    NzButtonModule,
    NzTableModule,
    UserInfo,
    PatientLabResultsTable,
    NsAutoHeightTableDirective,
    NzEmptyComponent
],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.scss'
})
export class PatientDetails implements OnInit{
  testsTable: LabTestV2Dto[] = [];

  isLoaded: boolean = true;

  route = inject(ActivatedRoute);
  private drawerService = inject(NzDrawerService);
  patientService = inject(UserService);

  readonly patientId = Number(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    this.patientService.getPatientData(this.patientId).pipe(take(1)).subscribe({
      next: p => this.patientService.selectedPatient = p,
    });
  }



  labTestsDrawer(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Παραγγελία εξετάσεων',
      nzClosable: false,
      nzMaskClosable: false,
      nzContent: LabTestsSectionsTable, 
      nzData: { selectedValues: this.testsTable },
      nzWidth: '90%',
      nzHeight: '100%',
    });

    drawerRef.afterClose.subscribe((res: LabTestV2Dto[]) => {
      if(res) {
        this.testsTable = res;
      }
    });
  }

  onIsLoaded(value: boolean): void {
    this.isLoaded = value;
  }
}
