import { DestroyRef, inject, Injectable, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private http = inject(HttpClient);
  private _destroyRef = inject(DestroyRef);
  public pokemons$ = new BehaviorSubject<Pokemon[]>([]); // BehaviorSubject est un observable qui émet la même valeur à tous les subscribers et retient la dernière valeur émise
  public selectedPokemon$ = new BehaviorSubject<Pokemon | null>(null);

  getPokemons(): void {
    this.http
      .get<Pokemon[]>('assets/pokemons.mock.json')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(pokemons => {
        this.pokemons$.next(pokemons);
        if (pokemons.length > 0) {
          this.selectedPokemon$.next(pokemons[0]);
        }
      });
  }

  selectPokemon(index: number): void {
    this.pokemons$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(pokemon => this.selectedPokemon$.next(pokemon[index]));
  }

  addPokemon(pokemon: Pokemon): void {
    const newPokemons = [pokemon, ...this.pokemons$.getValue()];
    this.pokemons$.next(newPokemons);
  }

  constructor() {
    this.getPokemons();
  }
}
