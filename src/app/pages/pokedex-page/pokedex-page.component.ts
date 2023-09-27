import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PokedexService } from '../../shared/services/pokedex.service';
import { Pokemon } from '../../shared/models/pokemon.model';

@Component({
  selector: 'app-pokedex-page',
  templateUrl: './pokedex-page.component.html',
  styleUrls: ['./pokedex-page.component.scss'],
})
export class PokedexPageComponent implements OnInit {
  pokedexService = inject(PokedexService);
  destroyRef = inject(DestroyRef); // Injecter la référence DestroyeRef pour pouvoir unsubscribe. Evite le ngOnDestroy()

  public pokemons!: Pokemon[];
  public selectedPokemon!: Pokemon | null;

  ngOnInit(): void {
    this.pokedexService.getPokemons();

    this.pokedexService.pokemons$
      .pipe(takeUntilDestroyed(this.destroyRef)) // Permet de unsubscribe lorsque le composant est détruit sans passer par ngOndestroy
      .subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      });

    this.pokedexService.selectedPokemon$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pokemon: Pokemon | null) => {
        this.selectedPokemon = pokemon;
      });
  }
}
