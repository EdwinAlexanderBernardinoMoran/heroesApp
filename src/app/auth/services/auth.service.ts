import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/enviroments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = enviroments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User|undefined{
    if (!this.user) return undefined

    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap(user => this.user = user),

      // Guardando el id en el local storage
      tap(user => localStorage.setItem('token', 'asdfasf552.pffsjmd55.mjKFjis8')
      )
    )
  }

  checkAuthentication(): Observable<boolean>{
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('item');

    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap(user => this.user = user),
      map(user => !!user),
      catchError( error => of(false))
    )
  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }

}
