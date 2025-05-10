import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {

  currentQuestionNumber: number = 1;
  numberOfQuestions: number = 0;
  currentQuestion: any = undefined;
  answers: string[] = [];
  selectedAnswers: string[] = [];

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('New route param:', id);
      this.loadData(id);
    });
  }

  private loadData(questionNumber: number) {
    this.numberOfQuestions = this.dataService.questions.length;
    this.currentQuestionNumber = questionNumber;
    console.log(this.currentQuestionNumber);
    this.currentQuestion = this.dataService.questions[this.currentQuestionNumber - 1];
    this.createPossibleAnswers();
    this.selectedAnswers = [];
  }

  private createPossibleAnswers() {
    this.answers = [];
    if (!this.currentQuestion || !this.currentQuestion.answers) return;
    const possibleAnswers = this.currentQuestion.answers;
    if (!possibleAnswers.answer_a || possibleAnswers.answer_a === null) return;
    this.answers.push(possibleAnswers.answer_a);
    if (!possibleAnswers.answer_b || possibleAnswers.answer_b === null) return;
    this.answers.push(possibleAnswers.answer_b);
    if (!possibleAnswers.answer_c || possibleAnswers.answer_c === null) return;
    this.answers.push(possibleAnswers.answer_c);
    if (!possibleAnswers.answer_d || possibleAnswers.answer_d === null) return;
    this.answers.push(possibleAnswers.answer_d);
    if (!possibleAnswers.answer_e || possibleAnswers.answer_e === null) return;
    this.answers.push(possibleAnswers.answer_e);
    if (!possibleAnswers.answer_f || possibleAnswers.answer_f === null) return;
    this.answers.push(possibleAnswers.answer_f);
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.selectedAnswers.push(event.target.value);
    } else {
      const index = this.selectedAnswers.indexOf(event.target.value);
      if (index > -1) this.selectedAnswers.splice(index, 1);
    }
  }

  proceed() {
    if (this.selectedAnswers === undefined || this.selectedAnswers === null || this.selectedAnswers.length === 0) return;
    this.dataService.setAnswers(this.currentQuestionNumber - 1, this.selectedAnswers);
    this.router.navigate(['/question', ++this.currentQuestionNumber]);
  }

  submit() {
    if (this.selectedAnswers === undefined || this.selectedAnswers === null || this.selectedAnswers.length === 0) return;
    this.router.navigate(['/results']);
  }
}
