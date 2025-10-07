import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledTextDetails } from './labeled-text-details';

describe('LabeledTextDetails', () => {
  let component: LabeledTextDetails;
  let fixture: ComponentFixture<LabeledTextDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabeledTextDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabeledTextDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
