import { Component, computed, EventEmitter, inject, OnInit, Output, output, signal, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NzCardModule } from "ng-zorro-antd/card";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';

import { take } from 'rxjs';

import { UserService } from '../../shared/user-service';
import { PatientDto } from '../../shared/patient-modal';
import { LabeledTextUserInfo } from "../labeled-text-user-info/labeled-text-user-info";
import { PatientIdentityForm } from '../patient-identity-form/patient-identity-form';
import { DemographicInfoForm } from '../demographic-info-form/demographic-info-form';
import { ContactInfoForm } from '../contact-info-form/contact-info-form';
import { ReloadPatientDetailsCardService } from '../../shared/reload-patient-details-card-service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    NzCardModule,
    NzDescriptionsModule,
    NzIconModule,
    NzDrawerModule,
    NzButtonModule,
    LabeledTextUserInfo,
],
  templateUrl: './user-info.html',
  styleUrl: './user-info.scss',
})
export class UserInfo implements OnInit {
  @ViewChild('drawerTitle', { static: true }) drawerTitle!: TemplateRef<any>;

  patient?: PatientDto | null;
  drawerWidth = window.innerWidth * 0.75;

  private userService = inject(UserService);
  private drawerService = inject(NzDrawerService);
  private notification = inject(NzNotificationService);
  private route = inject(ActivatedRoute);
  reloadService = inject(ReloadPatientDetailsCardService);
  
  readonly patientId = Number(this.route.snapshot.paramMap.get('id'));

  firstName = signal<string>('');
  lastName = signal<(string | null)[]>([]);

  fullName = computed(() => {
    return this.lastName().join(' ') + ' ' + this.firstName();
  });

  ngOnInit(): void {
    this.loadLabeledText();
  }

  loadLabeledText(): void {
      this.userService.getPatientData(this.patientId)
      .pipe(take(1))
      .subscribe({
        next: (res: PatientDto) => {
          this.patient = res;

          this.firstName.set(this.patient.patientIdentity.firstName!);
          this.lastName.set(this.patient.patientIdentity.lastName!);
        },
        error: err => {
          this.notification.error('Error', 'loadLabeledData error');
          console.log(err);
        },
        
      });

    // this.patient = this.userService.selectedPatient;

    // this.firstName.set(this.patient!.patientIdentity.firstName);
    // this.lastName.set(this.patient!.patientIdentity.lastName);
  }

    openContactInfoDrawer(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Επεξεργασία Στοιχείων Επικοινωνίας',
      nzContent: ContactInfoForm,
      nzData: { patientData: this.patient },
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '40%'
    });

    drawerRef.afterClose.subscribe((updatedPatient) => {
      if (updatedPatient) {
       this.userService.putPatient(this.patientId, updatedPatient).pipe(take(1)).subscribe(() => {
          this.loadLabeledText();
          this.userService.getPatientData(this.patientId);
       }); 
      }
    });
  }

  openDemographicInfoDrawer(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Επεξεργασία Δημογραφικών Στοιχείων',
      nzContent: DemographicInfoForm,
      nzData: { patientData: this.patient },
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '30%'
    });

    drawerRef.afterClose.subscribe((updatedPatient) => {
      if (updatedPatient) {
       this.userService.putPatient(this.patientId, updatedPatient).pipe(take(1)).subscribe(() => {
          this.loadLabeledText();
          this.userService.getPatientData(this.patientId);
       }); 
      }
    });
  }

    openPatientIdentityDrawer(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Επεξεργασία Στοιχείων Ταυτότητας',
      nzContent: PatientIdentityForm,
      nzData: { patientData: this.patient },
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '30%'
    });

    drawerRef.afterClose.subscribe((updatedPatient) => {
      if (updatedPatient) {
       this.userService.putPatient(this.patientId, updatedPatient).pipe(take(1)).subscribe(() => {
          this.loadLabeledText();
          this.userService.getPatientData(this.patientId);
       }); 
      }
    });
  }
}

