import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.dto';
import { CategoryService } from 'src/app/services/category.service';
import { FormUtil } from 'src/app/utils/form.utils';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
  displayedColumns: string[] = ['name', 'acoes'];

  paramsFilter = {
    nomeProduto: '',
    nomeCategoria: '',
  };

  form: FormGroup;
  categorias: Category[] = [];

  constructor(
    private service: CategoryService,
    private snackMessage: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.form = FormUtil.buildForm(Object.keys(new Category()));
    this.getAll();
  }

  save() {
    const values = this.form.value;
    this.service.add(values).subscribe({
      next: (resp) => {
        this.openMessage('Sucesso', 'OK');
        this.getAll();
      },
      complete: () => {},
      error: () => {
        this.openMessage('Error', 'OK');
      },
    });
  }

  remove(id: number) {
    this.service.remove(id).subscribe({
      next: (resp) => {
        this.openMessage('Sucesso', 'OK');
        this.getAll();
      },
      complete: () => {},
      error: () => {
        this.openMessage('Error', 'OK');
      },
    });
  }

  navigationByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  getAll() {
    this.service.getAll().subscribe({
      next: (resp) => {
        this.categorias = resp;
      },
      complete: () => {},
      error: () => {
        this.openMessage('Error', 'OK');
      },
    });
  }

  openMessage(msg: string, action: string) {
    this.snackMessage.open(msg, action);
  }
}
