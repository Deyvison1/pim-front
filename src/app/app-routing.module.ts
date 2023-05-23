import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ProdutoComponent } from './componentes/produto/produto.component';
import { AddUserComponent } from './componentes/add-user/add-user.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { VendaComponent } from './componentes/venda/venda.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'produto', component: ProdutoComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user-add', component: AddUserComponent, canActivate: [AuthGuard]
  },
  {
    path: 'category', component: CategoriaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard]
  },
  {
    path: 'venda', component: VendaComponent, canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
