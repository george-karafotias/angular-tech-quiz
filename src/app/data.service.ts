import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  questions: any[] = [];

  setAnswers(questionIndex: number, selectedAnswers: string[]) {
    this.questions[questionIndex].selectedAnswers = selectedAnswers;
  }

  getAnswers(questionIndex: number): string[] {
    return this.questions[questionIndex].selectedAnswers;
  }
}
