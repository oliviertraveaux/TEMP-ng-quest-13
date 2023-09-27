import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokedexService } from '../../shared/services/pokedex.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-pokemon-page',
  templateUrl: './create-pokemon-page.component.html',
  styleUrls: ['./create-pokemon-page.component.scss'],
})
export class CreatePokemonPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  destroyRef = inject(DestroyRef); // Injecter la référence DestroyeRef pour pouvoir unsubscribe. Evite le ngOnDestroy()
  private pokedexService = inject(PokedexService);

  public pokemons!: Pokemon[];

  createPokemonForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(2)]],
    imageUrl: ['', Validators.required],
  });

  ngOnInit() {
    this.pokedexService.pokemons$
      .pipe(takeUntilDestroyed(this.destroyRef)) // Permet de unsubscribe lorsque le composant est détruit sans passer par ngOndestroy
      .subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      });
  }

  onSubmit(): void {
    this.pokedexService.addPokemon(this.createPokemonForm.value as Pokemon);
  }
}
