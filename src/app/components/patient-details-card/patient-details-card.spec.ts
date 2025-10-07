import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailsCard } from './patient-details-card';

describe('PatientDetailsCard', () => {
  let component: PatientDetailsCard;
  let fixture: ComponentFixture<PatientDetailsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDetailsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDetailsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
