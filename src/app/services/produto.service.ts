import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private url: string = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}`);
  }

  add(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.url}`, produto);
  }

  remove(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
