import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions } from '@maskito/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { forkJoin, take } from 'rxjs';

// import dayjs, { Dayjs } from 'dayjs';

import { 
  AddressTypeDto, 
  ContactInfo, 
  DemographicInfo, 
  EducationLevelDto, 
  GenderDto, 
  MaritalStatusDto, 
  NationalityDto, 
  PatientDto, 
  PatientIdentity, 
  PhoneTypeDto, 
  ProfessionDto 
} from '../../shared/patient-modal';
import { UserService } from '../../shared/user-service';


@Component({
  selector: 'app-stable-elements',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaskitoDirective,
    NzFormModule,
    NzDividerModule,
    NzButtonModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzRadioModule
],
  templateUrl: './stable-elements.html',
  styleUrl: './stable-elements.scss'
})
export class StableElements implements OnInit{
  genders: GenderDto[] = [];
  maritalStatuses: MaritalStatusDto[] = [];
  educationLevels: EducationLevelDto[] = [];
  nationalities: NationalityDto[] = [];
  professions: ProfessionDto[] = [];
  phoneTypes: PhoneTypeDto[] = [];
  addressTypes: AddressTypeDto [] = [];

  nzData: { patientsData: PatientDto } = inject(NZ_DRAWER_DATA);
  private formBuilder = inject(FormBuilder);
  private drawerRef = inject(NzDrawerRef);
  private userService = inject(UserService);
  private notification = inject(NzNotificationService);

  stableElementsForm = this.formBuilder.group({
    amka: this.formBuilder.control<string | null>(null),
    code: this.formBuilder.control<string | null>(null),
    firstName: this.formBuilder.control<string | null>(null),
    lastName: this.formBuilder.control<string | null>(null),
    birthDate: this.formBuilder.control<Date| null>(null),
    birthPlace: this.formBuilder.control<string | null>(null),
    genderId: this.formBuilder.control<number | null>(null),
    maritalStatusId: this.formBuilder.control<number | null>(null),
    fatherName: this.formBuilder.control<string | null>(null),
    motherName: this.formBuilder.control<string | null>(null),
    language: this.formBuilder.control<string | null>(null),
    nationality: this.formBuilder.control<string | null>(null),
    profession: this.formBuilder.control<string | null>(null),
    educationId: this.formBuilder.control<number | null>(null),
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


  ngOnInit(): void {
    forkJoin({
      genders: this.userService.getGenders().pipe(take(1)),
      maritalStatuses: this.userService.getMaritalStatuses().pipe(take(1)),
      nationalities: this.userService.getNationalities().pipe(take(1)),
      professions: this.userService.getProfessions().pipe(take(1)),
      educationLevels: this.userService.getEducationLevels().pipe(take(1)),
      phoneTypes: this.userService.getPhoneTypes().pipe(take(1)),
      addressTypes: this.userService.getAddressTypes().pipe(take(1))
    }).subscribe({
          next: ({ 
              genders, 
              maritalStatuses, 
              nationalities, 
              professions, 
              educationLevels,
              phoneTypes,
              addressTypes 
          }) => {
            this.genders = genders;
            this.maritalStatuses = maritalStatuses;
            this.nationalities = nationalities;
            this.professions = professions;
            this.educationLevels = educationLevels;
            this.phoneTypes = phoneTypes;
            this.addressTypes = addressTypes;

            this.stableElementsForm.patchValue({
              amka: this.nzData.patientsData.patientIdentity.amka,
              code: this.nzData.patientsData.patientIdentity.code,
              firstName: this.nzData.patientsData.patientIdentity.firstName,
              lastName: this.nzData.patientsData.patientIdentity.lastName,
              // birthDate: this.nzData.patientsData.demographicInfo.birthDate,
              birthDate: this.nzData.patientsData.demographicInfo.birthDate
                ? new Date(this.nzData.patientsData.demographicInfo.birthDate)
                : null,
              birthPlace: this.nzData.patientsData.demographicInfo.birthPlace,
              genderId: this.nzData.patientsData.demographicInfo.gender.id,
              maritalStatusId: this.nzData.patientsData.demographicInfo.maritalStatus.id,
              fatherName: this.nzData.patientsData.demographicInfo.fatherName,
              motherName: this.nzData.patientsData.demographicInfo.motherName,
              language: this.nzData.patientsData.demographicInfo.language,
              nationality: this.nzData.patientsData.demographicInfo.nationality.name,
              profession: this.nzData.patientsData.demographicInfo.profession.name,
              educationId: this.nzData.patientsData.demographicInfo.education.id,
              phone1TypeId: this.nzData.patientsData.contactInfo.phone1TypeId,
              phone1: this.nzData.patientsData.contactInfo.phone1,
              phone1Label: this.nzData.patientsData.contactInfo.phone1Label,
              phone2TypeId: this.nzData.patientsData.contactInfo.phone2TypeId,
              phone2: this.nzData.patientsData.contactInfo.phone2,
              phone2Label: this.nzData.patientsData.contactInfo.phone2Label,
              phone3TypeId: this.nzData.patientsData.contactInfo.phone3TypeId,
              phone3: this.nzData.patientsData.contactInfo.phone3,
              phone3Label: this.nzData.patientsData.contactInfo.phone3Label,
              addressTypeId: this.nzData.patientsData.contactInfo.addressTypeId,
              addressLabel: this.nzData.patientsData.contactInfo.addressLabel,
              address: this.nzData.patientsData.contactInfo.address,
              email: this.nzData.patientsData.contactInfo.email
            });

            this.stableElementsForm.controls.birthPlace.valueChanges.subscribe(value => {
              if (value?.includes('Ελλάδα')) {
                this.stableElementsForm.controls.language.setValue('Ελληνική');
                this.stableElementsForm.controls.language.disable();
              } else {
                this.stableElementsForm.controls.language.enable();
              }
            });

  
          },
          error: (err) => {
            this.notification.error('Error', 'Failed to load dropdown data');
          }
        });  
  }



  closeDrawer(): void {
    this.drawerRef.close();
  }

  submitForm(): void {
    if (this.stableElementsForm.valid) {
    const formValues = this.stableElementsForm.value;

    const updatedPatientIdentity: PatientIdentity = {
      amka: formValues.amka!,
      code: formValues.code!,
      firstName: formValues.firstName!,
      lastName: formValues.lastName!,
      status: this.nzData.patientsData.patientIdentity.status
    };

    const selectedGender = this.genders.find(g =>  g.id === +formValues.genderId!)!;
    const selectedMaritalStatus = this.maritalStatuses.find(g => g.id === +formValues.maritalStatusId!)!;
    const selectedEducation = this.educationLevels.find(g => g.id === +formValues.educationId!)!;
    const selectedNationality = this.nationalities.find(g => g.name === formValues.nationality)!;
    const selectedProfession = this.professions.find(g => g.name === formValues.profession)!;

    const birthDate: Date | null | undefined = this.stableElementsForm.value.birthDate;

let birthDateForDB = '';
if (birthDate) {
  const day = String(birthDate.getDate()).padStart(2, '0');        // 01–31
  const month = String(birthDate.getMonth() + 1).padStart(2, '0'); // 01–12
  const year = String(birthDate.getFullYear()).slice(-2);          // last 2 digits
  birthDateForDB = `${day}/${month}/${year}`;                      // "22/01/85"
}

    
    const updatedDemographicInfo: DemographicInfo = {
      // birthDate: formValues.birthDate?.toISOString()!,
      birthDate: birthDateForDB!,
      birthPlace: formValues.birthPlace!,
      gender: { id: selectedGender.id, name: selectedGender.name },
      maritalStatus: { id: selectedMaritalStatus.id, name: selectedMaritalStatus.name},
      fatherName: formValues.fatherName!,
      motherName: formValues.motherName!,
      language: formValues.language!,
      nationality: { id: selectedNationality.id, name:  selectedNationality.name },
      profession: { id: selectedProfession.id, name: selectedProfession.name },
      education: { id: selectedEducation.id, name: selectedEducation.name},
    };    

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
      id: this.nzData.patientsData.id,
      patientIdentity: updatedPatientIdentity,
      demographicInfo: updatedDemographicInfo,
      contactInfo: updatedContactInfo,
    };

    this.drawerRef.close(updatedPatient);
    }
  }
}
