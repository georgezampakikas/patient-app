import { inject, Injectable, signal } from '@angular/core';
import { UserService } from './user-service';
import { PatientDto } from './patient-modal';
import { catchError, Observable, take, throwError } from 'rxjs';
import { LabeledTextInput } from '../components/labeled-text-details/labeled-text-input.modal';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReloadPatientDetailsCardService {
  patientData =  signal<PatientDto | null>(null);

  private readonly url = "http://localhost:3000";


  http = inject(HttpClient);
  userService = inject(UserService);

  handleError(error: unknown): Observable<never> {
    console.log('Error handled from handleError method reload');
    // return new Error('New error returned');
    return throwError(() => error);
  }

  reloadPatientDetailsCard(id: number): Observable<PatientDto> {
    return this.http.get<PatientDto>(`${this.url}/patients/${id}`)
    .pipe(
      catchError(this.handleError)
    )
  }
}
