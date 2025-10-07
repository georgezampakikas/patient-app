import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-labeled-text',
  imports: [],
  templateUrl: './labeled-text.html',
  styleUrl: './labeled-text.scss'
})
export class LabeledText {
  @Input() text!: string;
  @Input() label!: string;
}
