import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledText } from './labeled-text';

describe('LabeledText', () => {
  let component: LabeledText;
  let fixture: ComponentFixture<LabeledText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabeledText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabeledText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
