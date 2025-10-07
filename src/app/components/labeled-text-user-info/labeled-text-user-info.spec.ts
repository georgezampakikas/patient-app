import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledTextUserInfo } from './labeled-text-user-info';

describe('LabeledTextUserInfo', () => {
  let component: LabeledTextUserInfo;
  let fixture: ComponentFixture<LabeledTextUserInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabeledTextUserInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabeledTextUserInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
