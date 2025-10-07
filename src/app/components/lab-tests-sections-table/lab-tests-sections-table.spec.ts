import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTestsSectionsTable } from './lab-tests-sections-table';

describe('LabTestsSectionsTable', () => {
  let component: LabTestsSectionsTable;
  let fixture: ComponentFixture<LabTestsSectionsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabTestsSectionsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabTestsSectionsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
