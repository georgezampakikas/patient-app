import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Form, FormArray, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';

import { PatientDto, PatientIdentity } from '../../shared/patient-modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-patient-identity-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,  
    NzButtonModule,
    NzDividerModule,
    NzInputModule,
    NzFormModule,
    NzIconModule
  ],
  templateUrl: './patient-identity-form.html',
  styleUrl: './patient-identity-form.scss'
})
export class PatientIdentityForm implements OnInit {
  nzData: { patientData: PatientDto } = inject(NZ_DRAWER_DATA);

  firstName = signal<string>(this.nzData.patientData.patientIdentity.firstName!);
  lastName = signal<(string | null)[]>(this.nzData.patientData.patientIdentity.lastName);

  fullName = computed(() => {
    return this.lastName().join(' ')+ ' '  + this.firstName();
  });

  private drawerRef = inject(NzDrawerRef);
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
  const identity = this.nzData.patientData.patientIdentity;

  this.lastName.set(identity.lastName as (string | null)[]);

  this.patientIdentityForm.patchValue({
    amka: identity.amka,
    code: identity.code,
    firstName: identity.firstName,
    lastName: identity.lastName,
    fullName: this.fullName()
  });

  identity.lastName.forEach(name => {
    this.lastNameArray.push(this.formBuilder.control<string | null>(name));
  });
}


  patientIdentityForm = this.formBuilder.group({
    amka: this.formBuilder.control<string | null>(null),
    code: this.formBuilder.control<string | null>(null),
    firstName: this.formBuilder.control<string | null>(null),
    lastName: this.formBuilder.array([]),
    fullName: this.formBuilder.control<string | null>({ value: null, disabled: true }),
  });


  addLastName(): void {
    this.lastNameArray.push(this.formBuilder.control<string | null>(null));
  }

  removeLastName(index: number): void {
    this.lastNameArray.removeAt(index);
  }

  get lastNameArray(): FormArray {
    return this.patientIdentityForm.get('lastName') as FormArray;
  }

  closeDrawer(): void {
    this.drawerRef.close();
  }


  submitForm(): void {
    if(this.patientIdentityForm.valid) {
      const formValues = this.patientIdentityForm.value;                          

      const updatedPatientIdentity: PatientIdentity = {
        amka: formValues.amka!,
        code: formValues.code!,
        firstName: formValues.firstName!,
        lastName: this.lastNameArray.controls.map(c => c.value),
        status: this.nzData.patientData.patientIdentity.status
      }

      const updatedPatient: PatientDto = {
        id: this.nzData.patientData.id,
        patientIdentity: updatedPatientIdentity,
        demographicInfo: this.nzData.patientData.demographicInfo,
        contactInfo: this.nzData.patientData.contactInfo,
      };

      this.drawerRef.close(updatedPatient);
    }
  }
}
