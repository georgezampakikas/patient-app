import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerRef, NzDrawerContentDirective, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule, NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { UserService } from '../../shared/user-service';
import { take, forkJoin } from 'rxjs';
import { DemographicInfo, EducationLevelDto, GenderDto, MaritalStatusDto, NationalityDto, PatientDto, ProfessionDto } from '../../shared/patient-modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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

  nzData: { demographicInfo: DemographicInfo } = inject(NZ_DRAWER_DATA);

  private formBuilder = inject(FormBuilder);
  private drawerRef = inject(NzDrawerRef);
  private notification = inject(NzNotificationService);
  private userService = inject(UserService);

  ngOnInit(): void {
    forkJoin({
      genders: this.userService.getGenders().pipe(take(1)),
      maritalStatuses: this.userService.getMaritalStatuses().pipe(take(1)),
      nationalities: this.userService.getNationalities().pipe(take(1)),
      professions: this.userService.getProfessions().pipe(take(1)),
      educationLevels: this.userService.getEducationLevels().pipe(take(1)),
    }).subscribe({
      next: ({ genders, maritalStatuses, nationalities, professions, educationLevels }) => {
        this.genders = genders;
        this.maritalStatuses = maritalStatuses;
        this.nationalities = nationalities;
        this.professions = professions;
        this.educationLevels = educationLevels;

        const data = this.nzData.demographicInfo;
        this.demographicInfoForm.patchValue({
          birthDate: data.birthDate,
          birthPlace: data.birthPlace,
          genderId: data.gender.id,
          maritalStatusId: data.maritalStatus.id,
          fatherName: data.fatherName,
          motherName: data.motherName,
          language: data.language,
          nationality: data.nationality.name,
          profession: data.profession.name,
          educationId: data.education.id,
        });
      },
      error: (err) => {
        this.notification.error('Error', 'Failed to load dropdown data');
      }
    });
}  


  demographicInfoForm = this.formBuilder.group({
    birthDate: this.formBuilder.control<string | null>(null),
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
    if (this.demographicInfoForm.valid) {
      const formValues = this.demographicInfoForm.value;

      const selectedGender = this.genders.find(g =>  g.id === +formValues.genderId!)!;
      const selectedMaritalStatus = this.maritalStatuses.find(g => g.id === +formValues.maritalStatusId!)!;
      const selectedEducation = this.educationLevels.find(g => g.id === +formValues.educationId!)!;
      const selectedNationality = this.nationalities.find(g => g.name === formValues.nationality)!;
      const selectedProfession = this.professions.find(g => g.name === formValues.profession)!;


      const updatedDemographicInfo = {
          birthDate: formValues.birthDate!,
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

      this.drawerRef.close(updatedDemographicInfo);
    }
  }
}
