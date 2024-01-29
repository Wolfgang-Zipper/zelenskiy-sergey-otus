import { Injectable } from '@angular/core';

export interface Settings {
  languageFrom: string;
  languageTo: string;
  wordsAmount: number;
  exerciseTime: number;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private storageKey = 'appSettings';

  getSettings(): Settings | null {
    const settingsString = localStorage.getItem(this.storageKey);
    return settingsString ? JSON.parse(settingsString) : null;
  }

  saveSettings(settings: Settings): void {
    localStorage.setItem(this.storageKey, JSON.stringify(settings));
  }
}
