import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerComponent } from "ng-zorro-antd/divider";
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';

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
  ],
  templateUrl: './contact-info-form.html',
  styleUrl: './contact-info-form.scss'
})
export class ContactInfoForm implements OnInit{
  isPhoneTypeOther: boolean = false;

  private drawerRef = inject(NzDrawerRef);
  private formBuilder = inject(FormBuilder);
  
  contactInfoForm = this.formBuilder.group({
    phoneType: ['home'],
    phoneNumber: this.formBuilder.control<string | null>(null),
    phoneLabel: ['Ετικέτα Τηλεφώνου'],
    address: this.formBuilder.control<string | null>(null),
    email: this.formBuilder.control<string | null>(null)
  });

  ngOnInit(): void {
    this.contactInfoForm.valueChanges.subscribe(ci => this.isPhoneTypeOther = ci.phoneType === 'other');
  }

  closeDrawer(): void {
    this.drawerRef.close();
  }

  submitForm(): void {}
}