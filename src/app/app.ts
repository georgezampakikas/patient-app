import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainContent } from "./components/main-content/main-content";

@Component({
  selector: 'app-root',
  imports: [MainContent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('patient-app');
}
