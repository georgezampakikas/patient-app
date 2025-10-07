import { ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { NzTableModule } from "ng-zorro-antd/table";
import { NsAutoHeightTableDirective } from '../../../directives/ns-auto-height-table';
import { PatientResultTableDto } from '../../../shared/patient-modal';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';


@Component({
  selector: 'app-test-name-result',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule,
    NzTableModule,
    NzStatisticModule,
    NsAutoHeightTableDirective
  ],
  templateUrl: './test-name-result.html',
  styleUrl: './test-name-result.scss'
})
export class TestNameResult implements OnInit
{
  @ViewChild('chartContainerDiv') chartContainerDiv!: ElementRef;

  lastTestResult: PatientResultTableDto | null = null;
  nzData: { filteredResults: PatientResultTableDto[], multi: [] } = inject(NZ_MODAL_DATA);
  filteredResults: PatientResultTableDto[] = this.nzData.filteredResults;
  multi = this.nzData.multi;

  private cd = inject(ChangeDetectorRef);

  // ngx-chart
  
  assayChart: {
    scheme: string;
    showLabels: boolean;
    animations: boolean;
    xAxis: boolean;
    yAxis: boolean;
    timeline: boolean;
  } = {
    scheme: 'ocean',
    showLabels: true,
    animations: true,
    xAxis: true,
    yAxis: true,
    timeline: true
  };

  ngOnInit(): void {
    this.lastTestResult = this.findLastTestResult();
  }

  getCalculatedWidth(): number {
    if(!this.chartContainerDiv) {
      return 700;
    }

    const sourceDivWidth = this.chartContainerDiv.nativeElement.clientWidth;
    return sourceDivWidth;
  }

  findLastTestResult(): PatientResultTableDto {
    return this.filteredResults.reduce((latest, current) => {
        const latestDate = new Date(latest.issueDate!);
        const currentDate = new Date(current.issueDate!);
      return (currentDate > latestDate) ? current : latest;
    });
  }

}
