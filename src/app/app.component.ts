import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User, Users } from './models/user.model';
import { UsersService } from './services/users.service';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PruebaOrmigga';
  listaUsuarios: Array<Users> = [];
  usuario: User;
  verUsuario: boolean = false;
  campoBuscar: FormControl = new FormControl('', [])
  error: string;
  
  constructor(private _userService: UsersService, ){
    _userService.getUsers().subscribe( users => {
      this.listaUsuarios = users;
    });
    this.campoBuscar.valueChanges.pipe(
      debounceTime(1000)
      ).subscribe( (valor:string) => {
        this.buscarUser(valor);
      });
    }
    
    buscarUser( username: string ){
      if( username ){
        this._userService.getUser( username ).subscribe( user => {
            this.usuario = user;
            this.verUsuario = true;
        });
      }
    }
    
    verTablaLista(){
      this.verUsuario = false;
      this.campoBuscar.setValue('');
    }
  }
  