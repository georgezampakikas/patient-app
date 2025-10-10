import { Component, computed, effect, EventEmitter, inject, OnDestroy, OnInit, Output, output, signal, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NzCardModule } from "ng-zorro-antd/card";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';

import { Subscription, take } from 'rxjs';

import { UserService } from '../../shared/user-service';
import { PatientDto } from '../../shared/patient-modal';
import { LabeledTextUserInfo } from "../labeled-text-user-info/labeled-text-user-info";
import { PatientIdentityForm } from '../patient-identity-form/patient-identity-form';
import { DemographicInfoForm } from '../demographic-info-form/demographic-info-form';
import { ContactInfoForm } from '../contact-info-form/contact-info-form';

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
export class UserInfo implements OnInit, OnDestroy {
  @ViewChild('drawerTitle', { static: true }) drawerTitle!: TemplateRef<any>;


  patient: PatientDto | null = null;
  drawerWidth = window.innerWidth * 0.75;

  private userService = inject(UserService);
  private drawerService = inject(NzDrawerService);
  private notification = inject(NzNotificationService);
  private route = inject(ActivatedRoute);
  
  readonly patientId = Number(this.route.snapshot.paramMap.get('id'));

  firstName: string = '';
  lastName: (string | null)[] = [];
  fullName: string = '';

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.userService.selectedPatient$.subscribe(p => {
        this.patient  = p;

        this.firstName = p!.patientIdentity.firstName;
        this.lastName = p!.patientIdentity.lastName;
        this.fullName = this.lastName.join(' ') + ' ' + this.firstName;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
          this.userService.updatePatient(this.patientId);
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
          this.userService.updatePatient(this.patientId);
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
          this.userService.updatePatient(this.patientId);
       }); 
      }
    });
  }
}

