import { Component } from '@angular/core';
import { VocabularyService } from '../../services/vocabulary.service';

@Component({
  // ... декораторы компонента ...
})
export class GoComponent {
  currentWord!: string;
  userTranslation!: string;
  correctAnswersCount: number = 0;
  incorrectAnswersCount: number = 0;

  constructor(private vocabularyService: VocabularyService) {
    this.nextWord();
  }

  nextWord(): void {
    const words = Object.keys(this.vocabularyService.getWords());
    if (words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      this.currentWord = words[randomIndex];
    }
  }

  checkTranslation(): void {
    if (
      this.vocabularyService.checkTranslation(
        this.currentWord,
        this.userTranslation
      )
    ) {
      this.correctAnswersCount++;
      this.nextWord();
    } else {
      this.incorrectAnswersCount++;
    }
    this.userTranslation = '';
  }
}
