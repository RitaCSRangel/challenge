import { Component, OnInit } from '@angular/core';
import { Endereco } from 'src/app/models/endereco';
import { FormularioServiceService } from 'src/app/services/formularioService/formulario-service.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  endereco: Endereco | undefined;

  nome: string = "";
  sobrenome: string = "";

  telefone: string = "";
  telefoneInvalido: boolean = false;
  mensagemErroTelefone: string = "";

  cep: string = "";
  cepInvalido: boolean = false;
  mensagemErroCep: string = "";

  rua: string = "";
  complemento: string = "";
  bairro: string = "";
  cidade: string = "";
  estado: string = "";

  constructor(private service: FormularioServiceService) { }

  ngOnInit(): void {
  }

  ValidarTelefone(telefone: string) {

    var telefoneFormatado = "";
    this.mensagemErroTelefone = "";

    telefone = telefone.replace('/[^0-9]/', '');
    if (telefone.match(/^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/)) {

      this.telefoneInvalido = false;

      if (telefone.length >= 10) {
        telefoneFormatado = "(" + telefone.substring(0, 2) + ") ";
        telefoneFormatado += telefone.substring(2, 7) + "-";
        telefoneFormatado += telefone.substring(7, telefone.length) + "";
      }

      this.telefone = telefoneFormatado;

    } else {

      this.telefoneInvalido = true;

      if (!/^\d+$/.test(telefone)) {
        this.mensagemErroTelefone = "Insira somente números.";
      }

      if (/^\d+$/.test(telefone) && telefone.length < 10) {
        this.mensagemErroTelefone = "Insira DDD + número.";
      }

    }

  }

  ConsultarCEP(cep: string) {

    var cepFormatado = "";
    this.mensagemErroCep = "";

    cep = cep.replace('/[^0-9]/', '');

    if (cep.length == 8) {

      this.service.ConsultarCep(cep).subscribe((data) => {

        if (data.cep != null) {

          this.cepInvalido = false;
          this.mensagemErroCep = "";

          this.rua = data.logradouro;
          this.bairro = data.bairro;
          this.cidade = data.localidade;
          this.estado = data.uf;

          cepFormatado = cep.substring(0, 5) + "-";
          cepFormatado += cep.substring(5, cep.length) + "";
          this.cep = cepFormatado;

        } else {

          this.cepInvalido = true;
          this.mensagemErroCep = "CEP inválido.";
        }

      });

    } else {
      this.cepInvalido = true;
      this.mensagemErroCep = "CEP inválido.";
    }

  }

}
