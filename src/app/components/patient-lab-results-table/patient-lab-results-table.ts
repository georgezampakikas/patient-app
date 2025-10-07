import { Component, inject, OnInit } from '@angular/core';
import { NzTableModule } from "ng-zorro-antd/table";
import { forkJoin, map, take } from 'rxjs';
import { UserService } from '../../shared/user-service';
import { ActivatedRoute } from '@angular/router';
import { PatientResultTableDto } from '../../shared/patient-modal';
import { NsAutoHeightTableDirective } from '../../directives/ns-auto-height-table';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { TestNameResult } from './test-name-result/test-name-result';
import { CommonModule, formatDate } from '@angular/common';


@Component({
  selector: 'app-patient-lab-results-table',
  imports: [
    CommonModule,
    NzTableModule, 
    NsAutoHeightTableDirective,
    NzModalModule,
  ],
  templateUrl: './patient-lab-results-table.html',
  styleUrl: './patient-lab-results-table.scss'
})
export class PatientLabResultsTable implements OnInit {
  patientTestResults: PatientResultTableDto[] = [];
  filteredResults: PatientResultTableDto[] = [];

  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private modalService = inject(NzModalService);

  readonly patientId = Number(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    forkJoin({
      labTests: this.userService.getLabTests(),
      patientTestResults: this.userService.getPatientTestResults(),
    })
    .pipe(
      take(1),
      map(({ labTests, patientTestResults }) => {
        return patientTestResults
          .filter(test => +test.patientId === this.patientId)
          .map(test => {
            const labTest = labTests.find(labTest => +labTest.id === test.testId);

            return {
              id: labTest!.id,
              name: labTest!.name,
              unit: labTest!.unit,
              normalRange: labTest!.normalRange,
              testId: test.testId,
              result: test.result,
              patientId: test.patientId,
              issueDate: new Date(test.issueDate),
            };              
          })
         .sort((a, b) => {
          const dateDiff = +new Date(b.issueDate) - +new Date(a.issueDate);
          if (dateDiff !== 0) return dateDiff;

          return a.name.localeCompare(b.name);
        });
      })
    )
    .subscribe(result => {
      this.patientTestResults = result;
    });
  }

  testNameResultModal(selectedPatientTestResult: PatientResultTableDto): void {
    this.filteredResults = this.patientTestResults.filter(patientTestResult => 
      patientTestResult.testId === selectedPatientTestResult.testId);
    
    const  multi = [
    {
      name: selectedPatientTestResult.name,
      series: this.filteredResults.map(result => ({
        name: formatDate(result.issueDate!, 'dd/MM/yy', 'el-GR'),
        value: result.result
      }))
    },
  ]
      
    this.modalService.create({
      nzTitle: `${selectedPatientTestResult.name} - Details`,
      nzContent: TestNameResult,
      nzMaskClosable: false,
      nzData: {
        filteredResults: this.filteredResults,
        multi
      },
      nzFooter: null,
      nzWidth: '65%',
    });
  }
}
