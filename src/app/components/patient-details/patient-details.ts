import { Component, inject, signal } from '@angular/core';
import { PatientDetailsCard } from "../patient-details-card/patient-details-card";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { UserInfo } from "../user-info/user-info";
import { ActivatedRoute } from '@angular/router';
import { PatientLabResultsTable } from "../patient-lab-results-table/patient-lab-results-table";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { LabTestsSectionsTable } from '../lab-tests-sections-table/lab-tests-sections-table';
import { LabTestV2Dto } from '../../shared/patient-modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NsAutoHeightTableDirective } from '../../directives/ns-auto-height-table';

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

],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.scss'
})
export class PatientDetails {
  // testsTable: LabTestV2Dto[] = [];
  testsTable: LabTestV2Dto[] = []

  route = inject(ActivatedRoute);
  private drawerService = inject(NzDrawerService);

  readonly patientId = Number(this.route.snapshot.paramMap.get('id'));

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
}
