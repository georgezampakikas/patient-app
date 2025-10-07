import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientIdentityForm } from './patient-identity-form';

describe('PatientIdentityForm', () => {
  let component: PatientIdentityForm;
  let fixture: ComponentFixture<PatientIdentityForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientIdentityForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientIdentityForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
