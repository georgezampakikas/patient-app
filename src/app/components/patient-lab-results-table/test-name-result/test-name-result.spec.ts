import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNameResult } from './test-name-result';

describe('TestNameResult', () => {
  let component: TestNameResult;
  let fixture: ComponentFixture<TestNameResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestNameResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestNameResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
