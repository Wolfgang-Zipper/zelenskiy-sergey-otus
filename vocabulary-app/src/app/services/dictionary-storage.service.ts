import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SettingsService } from './settings-service.service';
export interface WordEntry {
  word: string;
  translation: string;
  settingsFromLang: string;
  settingsToLang: string;
}

@Injectable({
  providedIn: 'root',
})
export class DictionaryStorageService {
  private isBrowser: boolean;
  settings: any;

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    private settingsService: SettingsService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.settings = this.settingsService.getSettings();
  }

  checkWord(word: string, translation: string): boolean {
    const words = this.getWords();
    const wordEntry = words.find((w) => w.word === word);

    return (
      wordEntry !== undefined &&
      wordEntry.translation.toLowerCase() === translation.toLowerCase()
    );
  }
  getRandomWord(
    languageFrom: string,
    languageTo: string
  ): WordEntry | undefined {
    const words = this.getWords(); //  getWords() возвращает весь массив слов
    const filteredWords = words.filter(
      (wordEntry) =>
        wordEntry.settingsFromLang === languageFrom &&
        wordEntry.settingsToLang === languageTo
    ); //случайное слово  на основе фильтра с languageFrom languageTo

    if (filteredWords.length === 0) return undefined;

    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex];
  }
  private storageKey = 'dictionary';

  saveWords(words: WordEntry[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(words));
  }

  getWords(): WordEntry[] {
    if (!this.isBrowser) {
      // если не браузере, возвращаю пустой массив
      return [];
    }
    const wordsJson = localStorage.getItem(this.storageKey);
    return wordsJson ? JSON.parse(wordsJson) : [];
  }
}
