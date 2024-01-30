import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DictionaryStorageService,
  WordEntry,
} from '../../services/dictionary-storage.service';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings-service.service';

@Component({
  selector: 'app-go',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.scss'],
})
export class GoComponent implements OnInit {
  currentWord: string | undefined;
  userTranslation: string = '';
  correctTranslation: boolean | undefined;
  private currentWordEntry: WordEntry | undefined;
  settings: any;

  constructor(
    private storageService: DictionaryStorageService,
    private settingsService: SettingsService
  ) {
    this.settings = this.settingsService.getSettings();
  }

  ngOnInit() {
    this.getNextWord();
  }

  getNextWord() {
    this.correctTranslation = undefined; // добавил для скрытия проверки предыдущего словаря
    this.currentWordEntry = this.storageService.getRandomWord(
      this.settings.languageFrom,
      this.settings.languageTo
    );

    this.currentWord = this.currentWordEntry
      ? this.currentWordEntry.word
      : undefined;
    this.userTranslation = ''; // удаляю предыдущий ввод
  }
  getRandomWord(languageFrom: any, languageTo: any): WordEntry | undefined {
    throw new Error('Method not implemented.');
  }

  checkTranslation() {
    if (!this.currentWordEntry) return;

    this.correctTranslation = this.storageService.checkWord(
      this.currentWordEntry.word,
      this.userTranslation
    );
    if (this.correctTranslation) {
      // сдлед слово если тру
      this.getNextWord();
    }
  }
}
