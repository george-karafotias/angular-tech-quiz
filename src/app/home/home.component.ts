import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  categories: any[] = [];
  selectedCategory: any;
  difficulties: string[] = ['Easy', 'Medium', 'Hard'];
  selectedDifficulty: string = '';
  tags: string = '';
  limit: number = 10;
  questions: any[] = [];

  constructor(private quizService: QuizService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.quizService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  private getSelectedCategoryName(categoryId: string): string {
    if (this.categories === null || this.categories === undefined || this.categories.length === 0) return '';
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == categoryId) return this.categories[i].name;
    }
    return '';
  }

  startQuiz() {
    const category = this.getSelectedCategoryName(this.selectedCategory);
    const difficulty = this.selectedDifficulty ? this.selectedDifficulty : '';
    this.quizService.getQuestions(this.limit, category, difficulty).subscribe(
      (data) => {
        console.log(data);
        this.dataService.questions = data;
        this.router.navigate(['/question', 1]);
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }
}
