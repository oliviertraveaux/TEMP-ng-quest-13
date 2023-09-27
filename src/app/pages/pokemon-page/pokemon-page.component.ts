import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PokedexService } from '../../shared/services/pokedex.service';
import { Pokemon } from '../../shared/models/pokemon.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-page',
  templateUrl: './pokemon-page.component.html',
})
export class PokemonPageComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _pokedexService = inject(PokedexService);
  private _destroyRef = inject(DestroyRef);
  public paramId$!: Observable<number | null>;
  @Input() name: string = ''; // Permet d'écouter les params d'URL. Voir dans app-routing module.

  public pokemon!: Pokemon;

  ngOnInit() {
    // Autre manière d'écouter les paramètres d'URL

    // this.paramId$ = this._route.paramMap.pipe(
    //   map((params: ParamMap) => {
    //     const idString = params.get('id');
    //     return idString ? parseInt(idString, 10) : null;
    //   })
    // );

    this._pokedexService.pokemons$.subscribe(
      pokemons =>
        (this.pokemon = pokemons.filter(poke => poke.name === this.name)[0])
    );
  }
}
