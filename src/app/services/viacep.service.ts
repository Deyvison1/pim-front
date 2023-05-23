import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../models/endereco.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  url = 'https://viacep.com.br/ws/'
  constructor(private http: HttpClient) { }



  getEnderecoPorCep(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.url}${cep}/json/`);
  }
}
