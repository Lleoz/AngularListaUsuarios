import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Users } from '../models/user.model';

@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private httpClient: HttpClient) { }

  getUser( id: string ): Observable<User>{
    let url = `https://api.github.com/users/${ id }`;
    return this.httpClient.get<User>(url);
  }

  getUsers(): Observable<Array<Users>> {
    let url = 'https://api.github.com/users';
    return this.httpClient.get<Array<Users>>(url);
  }
  
}
