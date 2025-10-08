import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { take, forkJoin } from 'rxjs';

import { UserService } from '../../shared/user-service';
import { 
  DemographicInfo, 
  EducationLevelDto, 
  GenderDto, 
  MaritalStatusDto, 
  NationalityDto, 
  PatientDto, 
  ProfessionDto 
} from '../../shared/patient-modal';

@Component({
  selector: 'app-demographic-info-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NzButtonModule,
    NzDividerModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
],
  templateUrl: './demographic-info-form.html',
  styleUrl: './demographic-info-form.scss'
})
export class DemographicInfoForm implements OnInit {
  genders: GenderDto[] = [];
  maritalStatuses: MaritalStatusDto[] = [];
  educationLevels: EducationLevelDto[] = [];
  nationalities: NationalityDto[] = [];
  professions: ProfessionDto[] = [];

  nzData: { patientData: PatientDto } = inject(NZ_DRAWER_DATA);

  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private drawerRef = inject(NzDrawerRef);

  ngOnInit(): void {
    forkJoin({
      genders: this.userService.getGenders().pipe(take(1)),
      maritalStatuses: this.userService.getMaritalStatuses().pipe(take(1)),
      nationalities: this.userService.getNationalities().pipe(take(1)),
      professions: this.userService.getProfessions().pipe(take(1)),
      educationLevels: this.userService.getEducationLevels().pipe(take(1)),
    })
    .subscribe(({
      genders, 
      maritalStatuses, 
      nationalities, 
      professions, 
      educationLevels,
    }) => {
      this.genders = genders;
      this.maritalStatuses = maritalStatuses;
      this.nationalities = nationalities;
      this.professions = professions;
      this.educationLevels = educationLevels;

      this.demographicInfoForm.patchValue({
        birthDate: this.nzData.patientData.demographicInfo.birthDate
          ? new Date(this.nzData.patientData.demographicInfo.birthDate)
          : null,
        birthPlace: this.nzData.patientData.demographicInfo.birthPlace,
        genderId: this.nzData.patientData.demographicInfo.gender.id,
        maritalStatusId: this.nzData.patientData.demographicInfo.maritalStatus.id,
        fatherName: this.nzData.patientData.demographicInfo.fatherName,
        motherName: this.nzData.patientData.demographicInfo.motherName,
        language: this.nzData.patientData.demographicInfo.language,
        nationality: this.nzData.patientData.demographicInfo.nationality.name,
        profession: this.nzData.patientData.demographicInfo.profession.name,
        educationId: this.nzData.patientData.demographicInfo.education.id,
      });
    });
  }  


  demographicInfoForm = this.formBuilder.group({
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
  });


  closeDrawer(): void {
    this.drawerRef.close();
  }

  submitForm(): void {
    const formValues = this.demographicInfoForm.value;
    if(this.demographicInfoForm.valid) {
      const selectedGender = this.genders.find(g =>  g.id === +formValues.genderId!)!;
      const selectedMaritalStatus = this.maritalStatuses.find(g => g.id === +formValues.maritalStatusId!)!;
      const selectedEducation = this.educationLevels.find(g => g.id === +formValues.educationId!)!;
      const selectedNationality = this.nationalities.find(g => g.name === formValues.nationality)!;
      const selectedProfession = this.professions.find(g => g.name === formValues.profession)!;

      const birthDate: Date | null | undefined = this.demographicInfoForm.value.birthDate;

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
      
      const updatedPatient: PatientDto = {
        id: this.nzData.patientData.id,
        patientIdentity: this.nzData.patientData.patientIdentity,
        demographicInfo: updatedDemographicInfo,
        contactInfo: this.nzData.patientData.contactInfo
      };

      this.drawerRef.close(updatedPatient);
    }
  }
}
