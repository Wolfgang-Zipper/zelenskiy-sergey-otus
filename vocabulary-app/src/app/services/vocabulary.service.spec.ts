import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VocabularyService {
  private vocabulary: { [key: string]: string } = {};

  constructor() {}

  addWord(word: string, translation: string): void {
    this.vocabulary[word] = translation;
  }

  checkTranslation(word: string, translation: string): boolean {
    return this.vocabulary[word] === translation;
  }

  getWords(): { [key: string]: string } {
    return this.vocabulary;
  }
}
