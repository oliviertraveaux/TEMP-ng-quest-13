import { inject, Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private http = inject(HttpClient);
  public pokemons$ = new BehaviorSubject<Pokemon[]>([]); // BehaviorSubject est un observable qui émet la même valeur à tous les subscribers et retient la dernière valeur émise
  public selectedPokemon$ = new BehaviorSubject<Pokemon | null>(null);

  getPokemons(): void {
    this.http
      .get<Pokemon[]>('assets/pokemons.mock.json')
      .subscribe(pokemons => {
        this.pokemons$.next(pokemons);
        if (pokemons.length > 0) {
          this.selectedPokemon$.next(pokemons[0]);
        }
      });
  }

  selectPokemon(index: number): void {
    this.pokemons$.subscribe(pokemon =>
      this.selectedPokemon$.next(pokemon[index])
    );
  }

  addPokemon(pokemon: Pokemon): void {
    const newPokemons = [pokemon, ...this.pokemons$.getValue()];
    this.pokemons$.next(newPokemons);
  }
}
