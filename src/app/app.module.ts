import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ProdutoComponent } from './componentes/produto/produto.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { AddUserComponent } from './componentes/add-user/add-user.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { NavComponent } from './componentes/nav/nav.component';
import { DialogVendaComponent } from './componentes/dialog-venda/dialog-venda.component';
import { VendaComponent } from './componentes/venda/venda.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProdutoComponent,
    ClienteComponent,
    AddUserComponent,
    CategoriaComponent,
    NavComponent,
    DialogVendaComponent,
    VendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
