import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url: string = 'http://localhost:8080/api/cliente';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}`);
  }

  add(cliente: Cliente) {
    return this.http.post(`${this.url}`, cliente);
  }

  remove(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
