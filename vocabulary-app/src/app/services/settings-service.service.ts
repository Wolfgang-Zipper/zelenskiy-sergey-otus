import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getSettings(): Settings | null {
    if (isPlatformBrowser(this.platformId)) {
      const settingsString = localStorage.getItem(this.storageKey);
      return settingsString ? JSON.parse(settingsString) : null;
    } else {
      // Возможно, здесь следует предоставить запасной вариант или обработать отсутствие localStorage
      return null;
    }
  }

  saveSettings(settings: Settings): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(settings));
    } else {
      // Возможно, здесь следует предоставить запасной вариант или обработать отсутствие localStorage
    }
  }
}
