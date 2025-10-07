import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographicInfoForm } from './demographic-info-form';

describe('DemographicInfoForm', () => {
  let component: DemographicInfoForm;
  let fixture: ComponentFixture<DemographicInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemographicInfoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemographicInfoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
