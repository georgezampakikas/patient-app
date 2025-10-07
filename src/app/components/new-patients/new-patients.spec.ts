import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatients } from './new-patients';

describe('NewPatients', () => {
  let component: NewPatients;
  let fixture: ComponentFixture<NewPatients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPatients]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPatients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
