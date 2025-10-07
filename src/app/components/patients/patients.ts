import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { UserService } from '../../shared/user-service';
import { debounceTime, distinctUntilChanged, filter, switchMap, take } from 'rxjs';
import { PatientDto, PatientV2Dto } from '../../shared/patient-modal';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';




@Component({
  selector: 'app-patients',
  imports: [
    FormsModule,
    NzInputModule,
    NzIconModule,
    NzAutocompleteModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
],
  templateUrl: './patients.html',
  styleUrl: './patients.scss'
})
export class Patients {
  selectedPatient = signal<string>('');
  
  private userService = inject(UserService);

  private selectedPatient$ = toObservable(this.selectedPatient);

  patientData = toSignal(
    this.selectedPatient$.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      filter(term => term.trim().length > 3),
      switchMap(term => this.userService.getPatientsByName(term)),
    ),
    { initialValue: [] as PatientDto[] }
  );

  filteredPatients = computed(() => {
    const term = this.selectedPatient().toLowerCase().trim();
    const patients = this.patientData();
    if (term.length > 3) {
      return patients.filter(
        p =>
          p.patientIdentity.firstName.toLowerCase().includes(term) ||
          p.patientIdentity.lastName.toLowerCase().includes(term)
      );
    }
    return [];
  });

}
