import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StableElements } from './stable-elements';

describe('StableElements', () => {
  let component: StableElements;
  let fixture: ComponentFixture<StableElements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StableElements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StableElements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
