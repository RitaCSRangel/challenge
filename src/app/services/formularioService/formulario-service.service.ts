import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Endereco } from 'src/app/models/endereco';

@Injectable({
  providedIn: 'root'
})
export class FormularioServiceService {

  private urlViaCep = "https://viacep.com.br/ws/";

  constructor(private http: HttpClient) { }

  ConsultarCep (cep: string): Observable<Endereco>{
    return this.http.get<Endereco>(this.urlViaCep + cep + "/json/");
  }
}
