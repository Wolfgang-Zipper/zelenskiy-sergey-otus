import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { SettingsService } from '../../services/settings-service.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  settingsForm: FormGroup;

  constructor(private settingsService: SettingsService) {
    const settings =
      this.settingsService.getSettings() || this.getDefaultSettings(); // была ошибка при первом открытии, когда языков нету, добавил дефолтные данные
    this.settingsForm = new FormGroup({
      languageFrom: new FormControl(settings.languageFrom),
      languageTo: new FormControl(settings.languageTo),
      wordsAmount: new FormControl(settings.wordsAmount),
      exerciseTime: new FormControl(settings.exerciseTime),
    });
  }

  saveSettings(): void {
    this.settingsService.saveSettings(this.settingsForm.value);
  }

  private getDefaultSettings() {
    return {
      languageFrom: 'Russian',
      languageTo: 'English',
      wordsAmount: 20,
      exerciseTime: 10, // мин
    };
  }
}
