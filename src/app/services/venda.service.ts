import { Injectable } from '@angular/core';
import { Venda } from '../models/venda.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private url: string = 'http://localhost:8080/api/venda';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Venda[]> {
    return this.http.get<Venda[]>(`${this.url}`);
  }

  add(venda): Observable<Venda> {
    return this.http.post<Venda>(`${this.url}`, venda);
  }

  cancelarVenda(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.url}/cancelar/${id}`);
  }

  finalizarVenda(id: number) {
    return this.http.get(`${this.url}/finalizar/${id}`);
  }
}
