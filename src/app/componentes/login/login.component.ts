import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.dto';
import { UserService } from 'src/app/services/user.service';
import { FormUtil } from 'src/app/utils/form.utils';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  list = ['','ADMIN', 'ESTOQUISTA'];
  isLogin: boolean = true;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private snackMessage: MatSnackBar,
    private router: Router
  ) {}

  initForm() {
    this.form = FormUtil.buildForm(Object.keys(new User()));
  }

  ngOnInit(): void {
    this.initForm();
  }

  showAlert(msg: string, action: string) {
    this.snackMessage.open(msg, action);
  }

  loginOrCadastrar() {
    if(this.isLogin) {
      this.login();
    } else {
      this.cadastrar();
    }
  }

  cadastrar() {
    const user = this.form.value;

    this.service.add(user).subscribe(
      {
        next: () => {
          this.form.reset();
          this.isLogin = true;
        }, complete: () => {}, error: () => {}
      }
    );
  }

  login() {
    const user = this.form.value;
    this.service.login(user).subscribe({
      next: (resp) => {
        this.showAlert('Sucesso', 'OK');
        this.router.navigateByUrl('/produto');
      },
      complete: () => {},
      error: (err) => {
        if(err.status) {
          this.showAlert('Usuario ou senha incorretos!', 'OK');
        }
      },
    });
  }
}
