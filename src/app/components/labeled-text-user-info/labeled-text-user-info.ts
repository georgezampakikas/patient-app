import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-labeled-text-user-info',
  imports: [],
  templateUrl: './labeled-text-user-info.html',
  styleUrl: './labeled-text-user-info.scss'
})
export class LabeledTextUserInfo {
  @Input() text: string | undefined = '';
  @Input() label: string | undefined = '';
  @Input() isUrl?: boolean = false;
}
