import { inject, Injectable, signal } from '@angular/core';
import { UserService } from './user-service';
import { PatientDto } from './patient-modal';
import { take } from 'rxjs';
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


  reloadPatientDetailsCard(id: number): void {
    this.http.get<PatientDto>(`${this.url}/patients/${id}`)
    .subscribe({
      next: (res) => this.patientData.set(res),
      error: (err) => console.log(err)
    })
  }
}
