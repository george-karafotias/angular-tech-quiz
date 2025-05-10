import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {

  score: number = 0;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.score = this.calculateScore();
  }

  private calculateScore(): number {
    const questions = this.dataService.questions;

    let numberOfCorrectAnswers: number = 0;
    for (let i = 0; i < questions.length; i++) {
      const correctAnswersObject = questions[i].correct_answers;
      const possibleAnswersObject = questions[i].answers;
      const selectedAnswers: string[] = this.dataService.getAnswers(i);

      let correctAnswers = [];
      if (correctAnswersObject.answer_a_correct === 'true') correctAnswers.push(possibleAnswersObject.answer_a);
      if (correctAnswersObject.answer_b_correct === 'true') correctAnswers.push(possibleAnswersObject.answer_b);
      if (correctAnswersObject.answer_c_correct === 'true') correctAnswers.push(possibleAnswersObject.answer_c);
      if (correctAnswersObject.answer_d_correct === 'true') correctAnswers.push(possibleAnswersObject.answer_d);
      if (correctAnswersObject.answer_e_correct === 'true') correctAnswers.push(possibleAnswersObject.answer_e);
      if (correctAnswersObject.answer_f_correct === 'true') correctAnswers.push(possibleAnswersObject.answer_f);

      if (this.isCorrectAnswer(correctAnswers, selectedAnswers)) {
        numberOfCorrectAnswers++;
      }
    }

    return (numberOfCorrectAnswers / questions.length) * 100;
  }

  private isCorrectAnswer(correctAnswers: string[], selectedAnswers: string[]): boolean {
    if (correctAnswers === null || correctAnswers === undefined || correctAnswers.length === 0) return false;
    if (selectedAnswers === null || selectedAnswers === undefined || selectedAnswers.length === 0) return false;
    if (correctAnswers.length !== selectedAnswers.length) return false;

    for (let i = 0; i < selectedAnswers.length; i++) {
      if (correctAnswers.indexOf(selectedAnswers[i]) === -1) return false;
    }

    return true;
  }

  playAgain() {
    this.router.navigate(['/home']);
  }

}
