import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiV1Url = 'https://quizapi.io/api/v1/';

  constructor(private http: HttpClient) { }

  private getApiKeyParameter(): string {
    return 'apiKey=80aKMQPIkoXDPoAZFsl56eHxxoY4FIaGFPS1GGzP';
  }

  getCategories(): Observable<any> {
    return this.http.get(this.apiV1Url + 'categories?' + this.getApiKeyParameter());
  }

  getQuestions(limit: number, category: string = '', difficulty: string = '', tags: string[] = []): Observable<any> {
    let url: string = this.apiV1Url + 'questions?' + this.getApiKeyParameter();
    url = url + '&limit=' + limit;
    if (category.length > 0) {
      url = url + '&category=' + category;
    }
    if (difficulty.length > 0) {
      url = url + '&difficulty=' + difficulty;
    }
    return this.http.get(url);
  }
}
