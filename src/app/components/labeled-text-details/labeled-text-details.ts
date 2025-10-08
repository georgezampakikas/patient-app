import { Component, Input } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { LabeledTextInput } from './labeled-text-input.modal';

@Component({
  selector: 'app-labeled-text-details',
  imports: [
    NzIconModule,
  ],
  templateUrl: './labeled-text-details.html',
  styleUrl: './labeled-text-details.scss'
})
export class LabeledTextDetails {
  @Input() patientData!: LabeledTextInput;
}
