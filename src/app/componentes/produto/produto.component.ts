import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.dto';
import { Produto } from 'src/app/models/produto.dto';
import { CategoryService } from 'src/app/services/category.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { FormUtil } from 'src/app/utils/form.utils';
import { DialogVendaComponent } from '../dialog-venda/dialog-venda.component';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
})
export class ProdutoComponent implements OnInit {
  displayedColumns: string[] = [
    'nome',
    'fabricante',
    'valor',
    'quantidade',
    'category',
    'acoes',
  ];

  paramsFilter = {
    nomeProduto: '',
    nomeCategoria: '',
  };

  form: FormGroup;
  list: Category[] = [];
  produtos: Produto[] = [];
  produtosFiltrado: Produto[] = [];

  constructor(
    private categoryService: CategoryService,
    private snackMessage: MatSnackBar,
    private service: ProdutoService,
    public dialog: MatDialog
  ) {}

  initForm() {
    this.form = FormUtil.buildForm(Object.keys(new Produto()));
    this.getAllCategory();
    this.getAll();
  }

  searchProduto() {
    this.produtosFiltrado = this.produtos;
    if (this.paramsFilter.nomeCategoria) {
      this.produtosFiltrado = this.produtos.filter(
        (x) => x.category.name === this.paramsFilter.nomeCategoria
      );
    }

    if (this.paramsFilter.nomeProduto) {
      this.produtosFiltrado = this.produtos.filter(
        (x) => x.nome === this.paramsFilter.nomeProduto
      );
    }
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe({
      next: (resp) => {
        this.list = resp;
      },
      complete: () => {},
      error: (err) => {
        let msg = '';

        if (err.status == 403) {
          msg = 'Sem permissao para realizar essa ação';
        } else {
          msg = 'Erro inesperado';
        }
        this.snackMessage.open(msg, 'OK');
      },
    });
  }

  remove(id: number) {
    let msg = '';

    this.service.remove(id).subscribe({
      next: (resp) => {
        this.getAll();
        msg = 'Sucesso';
      },
      complete: () => {},
      error: (err) => {
        if (err.status == 403) {
          msg = 'Sem permissao para realizar essa ação';
        } else {
          msg = 'Erro inesperado';
        }
      },
    });
    this.snackMessage.open(msg, 'OK');
  }

  getAll() {
    this.service.getAll().subscribe({
      next: (resp) => {
        this.produtos = resp;
        this.produtosFiltrado = this.produtos;
      },
      complete: () => {},
      error: (err) => {
        let msg = '';

        if (err.status == 403) {
          msg = 'Sem permissao para realizar essa ação';
        } else {
          msg = 'Erro inesperado';
        }
        this.snackMessage.open(msg, 'OK');
      },
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
  
  openDialog(produto: Produto) {
    const dialogRef = this.dialog.open(DialogVendaComponent, {
      data: produto,
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
  }

  save() {
    const produto = this.form.value;
    if(!this.list.length) {
      this.snackMessage.open('E necessario ter uma categoria para cadastrar produto');
      return;
    }
    this.service.add(produto).subscribe({
      next: (resp) => {
        this.getAll();
      },
      error: () => {},
      complete: () => {},
    });
  }
}
