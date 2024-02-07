import { Injectable } from '@angular/core';

interface WordEntry {
  word: string;
  translation: string;
}

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private recentlyAddedWords: WordEntry[] = [];

  constructor() {}

  addWord(word: string, translation: string): void {
    const wordEntry: WordEntry = { word, translation };
    this.recentlyAddedWords.unshift(wordEntry);
  }

  getWords(): WordEntry[] {
    return this.recentlyAddedWords;
  }
}
