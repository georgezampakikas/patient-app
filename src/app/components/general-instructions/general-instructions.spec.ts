import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInstructions } from './general-instructions';

describe('GeneralInstructions', () => {
  let component: GeneralInstructions;
  let fixture: ComponentFixture<GeneralInstructions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralInstructions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInstructions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
