import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NzCardModule } from "ng-zorro-antd/card";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';

import { take } from 'rxjs';

import { UserService } from '../../shared/user-service';
import { PatientDto, PatientIdentity } from '../../shared/patient-modal';
import { LabeledTextUserInfo } from "../labeled-text-user-info/labeled-text-user-info";
import { PatientIdentityForm } from '../patient-identity-form/patient-identity-form';
import { DemographicInfoForm } from '../demographic-info-form/demographic-info-form';
import { ContactInfoForm } from '../contact-info-form/contact-info-form';
import { StableElements } from '../stable-elements/stable-elements';
import { PatientDetailsCard } from '../patient-details-card/patient-details-card';
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


  ngOnInit(): void {
    this.loadLabeledText();
  }

  loadLabeledText(): void {
      this.userService.getPatientData(this.patientId)
      .pipe(take(1))
      .subscribe({
        next: (res: PatientDto) => {
          this.patient = res;
        },
        error: err => {
          this.notification.error('Error', 'loadLabeledData error');
          console.log(err);
        },
        
      });
  }

  openStableElementsDrawer(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Σταθερά Στοιχεία',
      nzContent: StableElements,
      nzData: { patientsData: this.patient },
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: this.drawerWidth
    });

    drawerRef.afterClose.subscribe((updatedPatient) => {
      if (updatedPatient) {
        this.userService.putPatient(this.patientId, updatedPatient)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.notification.success('Successfully', 'put patients data');
            this.loadLabeledText();
            this.reloadService.reloadPatientDetailsCard(this.patientId);

          },
          error: err => {
            this.notification.error('Error:', 'put method failed');
            console.log(err);
          }
        });
      }
    });
  }
}

