import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(private router: Router, private userService: UserService) {}

  isLogado(){ 
    return this.userService.logado();
  }
  

  sair() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
