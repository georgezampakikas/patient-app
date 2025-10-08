import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzEmptyComponent } from "ng-zorro-antd/empty";

import { UserService } from '../../shared/user-service';


@Component({
  selector: 'app-patients',
  imports: [
    FormsModule,
    NzInputModule,
    NzIconModule,
    NzAutocompleteModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NzEmptyComponent
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
      switchMap(term => 
        this.userService.getPatientsByName(term)
          .pipe(
          map(pa => pa.map(p => {
            return {
              ...p, 
              patientIdentity: {
                ...p.patientIdentity, 
                fullName: p.patientIdentity.lastName.join(' ') + ' ' + p.patientIdentity.firstName
              }
            }
          }))
        )
      )
    ),
    { initialValue: [] }
  );

  filteredPatients = computed(() => {
    const term = this.selectedPatient().toLowerCase().trim();
    const patients = this.patientData();
    if (term.length > 3) {
      return patients.filter(
        p =>
          p.patientIdentity.firstName!.toLowerCase().includes(term)  ||
          p.patientIdentity.lastName!.some(name => name!.toLowerCase().includes(term))
      );
    }
    return [];
  });

}
