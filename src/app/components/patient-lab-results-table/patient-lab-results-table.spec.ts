import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientLabResultsTable } from './patient-lab-results-table';

describe('PatientLabResultsTable', () => {
  let component: PatientLabResultsTable;
  let fixture: ComponentFixture<PatientLabResultsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientLabResultsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientLabResultsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
