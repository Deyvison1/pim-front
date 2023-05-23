import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/models/cliente.dto';
import { Endereco } from 'src/app/models/endereco.dto';
import { ClienteService } from 'src/app/services/cliente.service';
import { ViacepService } from 'src/app/services/viacep.service';
import { FormUtil } from 'src/app/utils/form.utils';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  displayedColumns: string[] = [
    'rg',
    'cpf',
    'dataCadastro',
    'telefone',
    'nome',
    'email',
    'endereco',
    'acoes',
  ];

  cep: string;
  form: FormGroup;
  clientes: Cliente[] = [];
  constructor(
    private service: ClienteService,
    private viacepService: ViacepService,
    private snackMessage: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.form = FormUtil.buildForm(Object.keys(new Cliente()));
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe({
      next: (resp) => {
        this.clientes = resp;
      },
      complete: () => {},
      error: () => {},
    });
  }

  save() {
    let msg =
      'Erro ao buscar o endereco pelo cep, so pode cadastrar cliente com endereco completo';
    this.viacepService.getEnderecoPorCep(this.cep).subscribe({
      next: (resp) => {
        const values = this.form.value;
        values.endereco = resp;
        if (resp) {
          this.service.add(values).subscribe({
            next: (resp) => {
              this.getAll();
            },
            complete: () => {},
            error: () => {},
          });
        }
      },
      complete: () => {},
      error: () => {
        this.snackMessage.open(msg, 'OK');
      },
    });
  }

  deletar(id: number) {
    this.service.remove(id).subscribe({
      next: (resp) => {
        this.snackMessage.open('Sucesso', 'OK');
        this.getAll();
      },
      complete: () => {},
      error: () => {},
    });
  }
}
