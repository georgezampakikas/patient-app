import { TestBed } from '@angular/core/testing';

import { ReloadPatientDetailsCardService } from './reload-patient-details-card-service';

describe('ReloadPatientDetailsCardService', () => {
  let service: ReloadPatientDetailsCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReloadPatientDetailsCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
