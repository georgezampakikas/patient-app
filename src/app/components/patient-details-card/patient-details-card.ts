import { Component, computed, effect, EventEmitter, inject, input, OnInit, Output, output, signal } from '@angular/core';

import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { LabeledTextDetails } from "../labeled-text-details/labeled-text-details";
import { LabeledTextInput } from '../labeled-text-details/labeled-text-input.modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../../shared/user-service';
import { take } from 'rxjs';
import { PatientDto } from '../../shared/patient-modal';



@Component({
  selector: 'app-patient-details-card',
  imports: [
    NzImageModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    NzTagModule,
    LabeledTextDetails,
],
  templateUrl: './patient-details-card.html',
  styleUrl: './patient-details-card.scss'
})
export class PatientDetailsCard  {
  patientId = input.required<number>();

  patientData = signal<PatientDto | null>(null);

  private userService = inject(UserService);

  constructor() {
    effect(() => {
      this.patientData.set(this.userService.selectedPatient());
    });
  }



  personalInfo = computed<LabeledTextInput>(() => ({
    label: 'AMKA',
    text:  this.patientData()?.patientIdentity.amka ?? '',
    icon: 'idcard',
    type: 'text',    
  })); 

  fathersName = computed<LabeledTextInput>(() => ({
    label: 'Όνομα Πατρός:',
    text:  this.patientData()?.demographicInfo.fatherName ?? '',
    icon: 'user',
    type: 'text', 
  })); 

  emergencyCall = computed<LabeledTextInput>(() => ({
    label:  'Επαφή Άμεσης Ανάγκης:',
    text: this.patientData()?.demographicInfo.fatherName ?? '',
    icon: 'star',
    type: 'text',   
  })); 


  contact = computed<LabeledTextInput>(() => ({
    label: 'Οικίας',
    text:  this.patientData()?.contactInfo.phone1 ?? '',
    icon: 'phone',
    type: 'telephone',
  })); 


  email = computed<LabeledTextInput>(() => ({
    label: 'Email:',
    text:  this.patientData()?.contactInfo.email ?? '',
    icon: 'mail',
    type: 'url',
  })); 


  address = computed<LabeledTextInput>(() => ({
    label: 'Διεύθυνση:',
    text:  this.patientData()?.contactInfo.address ?? '',
    icon: 'environment',
    type: 'url',  
  })); 

}
