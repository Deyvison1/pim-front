import { Injectable } from '@angular/core';
import { Category } from '../models/category.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url: string = 'http://localhost:8080/api/category';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}`);
  }

  add(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.url}`, category);
  }

  remove(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
