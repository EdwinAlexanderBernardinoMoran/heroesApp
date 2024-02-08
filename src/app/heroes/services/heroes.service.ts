import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { enviroments } from 'src/enviroments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = enviroments.baseUrl;
  constructor(private http: HttpClient) { }

  // Obtiene todos los heroes
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  // Obtener un heroe por su ID
  getHeroById(id: string): Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError(error => of(undefined))
    )
  }

  // Filtro de busqueda y autocompletado
  getSuggestions(query: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${ query }&_limit=6`);
  }

  // Agregar un heroe
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  // Actualizar un heroe
  updateHero(hero: Hero): Observable<Hero>{
    if (!hero.id) throw Error("Hero id is required");
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  // Eliminar un heroe
  deleteHero(id: string): Observable<boolean>{
    if (!id) throw Error("Hero id is required");
    return this.http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      map(response => true),
      catchError( error => of(false)),
    );
  }
}
