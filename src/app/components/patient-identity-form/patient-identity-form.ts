import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { DemographicInfo, PatientDto, PatientIdentity } from '../../shared/patient-modal';
import { UserService } from '../../shared/user-service';

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
  ],
  templateUrl: './patient-identity-form.html',
  styleUrl: './patient-identity-form.scss'
})
export class PatientIdentityForm implements OnInit {
  nzData: { patientIdentityData: PatientIdentity } = inject(NZ_DRAWER_DATA);

  initialUserInfoValues!: DemographicInfo;

  private drawerRef = inject(NzDrawerRef);
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private notification = inject(NzNotificationService);

  ngOnInit(): void {
    this.patientIdentityForm.patchValue({
      amka: this.nzData.patientIdentityData.amka,
      code: this.nzData.patientIdentityData.code,
      firstName: this.nzData.patientIdentityData.firstName,
      lastName: this.nzData.patientIdentityData.lastName,
    });
  }

  patientIdentityForm = this.formBuilder.group({
    amka: [''],
    code: [''],
    firstName: [''],
    lastName: [''],
  });

  closeDrawer(): void {
    this.drawerRef.close();
  }


  submitForm(): void {
    if (this.patientIdentityForm.valid) {
      const formValues = this.patientIdentityForm.value;

      const updatedPatientIdentity: PatientIdentity = {
        code: formValues.code ?? '',
        amka: formValues.amka ?? '',
        firstName: formValues.firstName ?? '',
        lastName: formValues.lastName ?? '',
        status: this.nzData.patientIdentityData.status, 
      };

      this.drawerRef.close(updatedPatientIdentity);
    }
  }


}
