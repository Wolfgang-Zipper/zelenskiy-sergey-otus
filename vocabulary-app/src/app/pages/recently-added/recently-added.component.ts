import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DictionaryStorageService,
  WordEntry,
} from '../../services/dictionary-storage.service';
import { SettingsService } from '../../services/settings-service.service';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class RecentlyAddedComponent {
  newWord: string = '';
  newTranslation: string = '';
  recentlyAddedWords: WordEntry[];
  settings: any;

  constructor(
    private storageService: DictionaryStorageService,
    private settingsService: SettingsService
  ) {
    this.recentlyAddedWords = this.storageService.getWords();
    this.settings =
      this.settingsService.getSettings() || this.getDefaultSettings(); // была ошибка при первом открытии, когда языков нету, добавил дефолтные данные
    console.log(this.settings);
    console.log(this.recentlyAddedWords);
  }
  getSettings(): void {
    this.settingsService.getSettings();
  }
  addWord(): void {
    if (this.newWord && this.newTranslation) {
      const wordEntry: WordEntry = {
        word: this.newWord,
        translation: this.newTranslation,
        settingsFromLang: this.settings.languageFrom,
        settingsToLang: this.settings.languageTo,
      };
      this.recentlyAddedWords.unshift(wordEntry);
      // сохраняю в localStorage после добавления нового слова
      this.storageService.saveWords(this.recentlyAddedWords);
      // обнуляю поля ввода после добавления
      this.newWord = '';
      this.newTranslation = '';
    }
  }
  private getDefaultSettings() {
    return {
      // дефолтные данные
      languageFrom: 'English',
      languageTo: 'Russian',
      wordsAmount: 20,
      exerciseTime: 10, // будет в минутах
    };
  }
}
