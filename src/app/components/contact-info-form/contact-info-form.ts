import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerComponent } from "ng-zorro-antd/divider";
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions } from '@maskito/core';

import { forkJoin, take } from 'rxjs';

import { AddressTypeDto, ContactInfo, PatientDto, PhoneTypeDto } from '../../shared/patient-modal';
import { UserService } from '../../shared/user-service';

@Component({
  selector: 'app-contact-info-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzDividerComponent,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzRadioModule,
    MaskitoDirective
  ],
  templateUrl: './contact-info-form.html',
  styleUrl: './contact-info-form.scss'
})
export class ContactInfoForm implements OnInit {
  nzData: { patientData: PatientDto } = inject(NZ_DRAWER_DATA);

  phoneTypes: PhoneTypeDto[] = [];
  addressTypes: AddressTypeDto [] = [];
  
  private userService = inject(UserService);
  private drawerRef = inject(NzDrawerRef);
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    forkJoin({
      phoneTypes: this.userService.getPhoneTypes().pipe(take(1)),
      addressTypes: this.userService.getAddressTypes().pipe(take(1))
    })
    .subscribe(({phoneTypes, addressTypes}) => {
      this.phoneTypes = phoneTypes;
      this.addressTypes = addressTypes;

      this.contactInfoForm.patchValue({
        phone1TypeId: this.nzData.patientData.contactInfo.phone1TypeId,
        phone1: this.nzData.patientData.contactInfo.phone1,
        phone1Label: this.nzData.patientData.contactInfo.phone1Label,
        phone2TypeId: this.nzData.patientData.contactInfo.phone2TypeId,
        phone2: this.nzData.patientData.contactInfo.phone2,
        phone2Label: this.nzData.patientData.contactInfo.phone2Label,
        phone3TypeId: this.nzData.patientData.contactInfo.phone3TypeId,
        phone3: this.nzData.patientData.contactInfo.phone3,
        phone3Label: this.nzData.patientData.contactInfo.phone3Label,
        addressTypeId: this.nzData.patientData.contactInfo.addressTypeId,
        addressLabel: this.nzData.patientData.contactInfo.addressLabel,
        address: this.nzData.patientData.contactInfo.address,
        email: this.nzData.patientData.contactInfo.email
      });
    });
  }

  contactInfoForm = this.formBuilder.group({
    phone1TypeId: this.formBuilder.control<number | null>(1),
    phone1: this.formBuilder.control<string | null>(
      null,
      [
        Validators.minLength(10),
        Validators.maxLength(10),
      ]
    ),
    phone1Label: this.formBuilder.control<string | null>(null),
    phone2TypeId: this.formBuilder.control<number | null>(1),
    phone2: this.formBuilder.control<string | null>(
      null,
      [
        Validators.minLength(10),
        Validators.maxLength(10),
      ]
    ),
    phone2Label: this.formBuilder.control<string | null>(null),
    phone3TypeId: this.formBuilder.control<number | null>(1),
    phone3: this.formBuilder.control<string | null>(
      null,
      [
        Validators.minLength(10),
        Validators.maxLength(10),
      ]
    ),
    phone3Label: this.formBuilder.control<string | null>(null),
    addressTypeId: this.formBuilder.control<number | null>(1),
    addressLabel: this.formBuilder.control<string | null>(null),
    address: this.formBuilder.control<string | null>(null),
    email: this.formBuilder.control<string | null>(
      null, 
      [Validators.email]
    )
  });

  phone2Mask: MaskitoOptions = {
    mask: [
      '6', '9',
      /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/
    ],
  };

  phoneMask: MaskitoOptions = {
      mask: [
      /\d/, /\d/,
      /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/
    ],
  };

  closeDrawer(): void {
    this.drawerRef.close();
  }

  submitForm(): void {
    const formValues = this.contactInfoForm.value;
    if(this.contactInfoForm.valid) {
      const updatedContactInfo: ContactInfo = {
        phone1TypeId: formValues.phone1TypeId!,
        phone1: formValues.phone1!,
        phone1Label: formValues.phone1Label!,
        phone2TypeId: formValues.phone2TypeId!,
        phone2: formValues.phone2!,
        phone2Label: formValues.phone2Label!,
        phone3TypeId: formValues.phone3TypeId!,
        phone3: formValues.phone3!,
        phone3Label: formValues.phone3Label!,
        addressTypeId: formValues.addressTypeId!,
        addressLabel: formValues.addressLabel!,
        address: formValues.address!,
        email: formValues.email!
      };

      const updatedPatient: PatientDto = {
        id: this.nzData.patientData.id,
        patientIdentity: this.nzData.patientData.patientIdentity,
        demographicInfo: this.nzData.patientData.demographicInfo,
        contactInfo: updatedContactInfo
      };

      this.drawerRef.close(updatedPatient);
    }
  }
}