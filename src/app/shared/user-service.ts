import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { catchError, map, Observable, of, retry, tap, throwError } from 'rxjs';

import { 
  AddressTypeDto,
  EducationLevelDto, 
  GenderDto, 
  LabTestDto, 
  LabTestV2Dto, 
  MaritalStatusDto, 
  NationalityDto, 
  PatientDto,  
  PatientTestResultDto,  
  PhoneTypeDto, 
  ProfessionDto 
} from './patient-modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  patientData =  signal<PatientDto | null>(null);

  private readonly url = "http://localhost:3000";

  private httpClient = inject(HttpClient);

  selectedPatient: PatientDto | null = null;

  handleError(error: unknown): Observable<never> {
    console.log('Error handled from handleError method user');
    // return new Error('New error returned');
    return throwError(() => error);
  }

  getPatientData(id: number): Observable<PatientDto> {
    return this.httpClient.get<PatientDto>(`${this.url}/patients/${id}`)
    .pipe(
      tap((res) => this.patientData.set(res)),
      catchError(this.handleError));
  }

  getPatientsDto(): Observable<PatientDto[]> {
    return this.httpClient.get<PatientDto[]>(`${this.url}/patients`);
  }

  putPatient(id: number, updatedPatient: PatientDto): Observable<PatientDto> {
    return this.httpClient.put<PatientDto>(`${this.url}/patients/${id}`, updatedPatient);
  }

  getGenders(): Observable<GenderDto[]> {
    return this.httpClient.get<GenderDto[]>(`${this.url}/genders`)
    .pipe(map(genders => genders.map(gender => ({
      ...gender,
      id: +gender.id
    }))));
  }

  getMaritalStatuses(): Observable<MaritalStatusDto[]> {
    return this.httpClient.get<MaritalStatusDto[]>(`${this.url}/maritalStatuses`)
    .pipe(map(maritalStatuses => maritalStatuses.map(maritalStatus => ({
      ...maritalStatus,
      id: +maritalStatus.id
    }))));
  }

  getEducationLevels(): Observable<EducationLevelDto[]> {
    return this.httpClient.get<EducationLevelDto[]>(`${this.url}/educationLevels`)
    .pipe(map(educationLevels => educationLevels.map(educationLevel => ({
      ...educationLevel,
      id: +educationLevel.id
    }))));
  }

  getNationalities(): Observable<NationalityDto[]> {
    return this.httpClient.get<NationalityDto[]>(`${this.url}/nationalities`)
    .pipe(map(nationalities => nationalities.map(nationality => ({
      ...nationality,
      id: +nationality.id
    }))));
  }

  getProfessions(): Observable<ProfessionDto[]> {
    return this.httpClient.get<ProfessionDto[]>(`${this.url}/professions`)
    .pipe(map(professions => professions.map(profession => ({
      ...profession,
      id: +profession.id
    }))));
  }

  getPhoneTypes(): Observable<PhoneTypeDto[]> {
    return this.httpClient.get<PhoneTypeDto[]>(`${this.url}/phoneType`)
    .pipe(map(phoneTypes => phoneTypes.map(phoneType => ({
      ...phoneType,
      id: +phoneType.id
    }))));
  }

  getAddressTypes(): Observable<AddressTypeDto[]> {
    return this.httpClient.get<AddressTypeDto[]>(`${this.url}/addressType`)
    .pipe(map(addressTypes => addressTypes.map(addressType => ({
      ...addressType,
      id: +addressType.id
    }))));
  }

  getLabTests(): Observable<LabTestDto[]>{
    return this.httpClient.get<LabTestDto[]>(`${this.url}/labTests`);
  };

  getPatientTestResults(): Observable<PatientTestResultDto[]>{
    return this.httpClient.get<PatientTestResultDto[]>(`${this.url}/patientTestResults`);
  };

  getLabTestV2(): Observable<LabTestV2Dto[]>{
    return this.httpClient.get<LabTestV2Dto[]>(`${this.url}/labTestsV2`)
    .pipe(map(labTests => labTests.map(labTest => ({
      ...labTest,
      id: +labTest.id
    }))));
  }

  getPatientsByName(term: string) {
    const params = new HttpParams().set('q', term);
    return this.httpClient.get<PatientDto[]>(`${this.url}/patients`, { params });
  }

}
