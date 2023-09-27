import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokedexService } from '../../shared/services/pokedex.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-pokemon-page',
  templateUrl: './create-pokemon-page.component.html',
  styleUrls: ['./create-pokemon-page.component.scss'],
})
export class CreatePokemonPageComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _pokedexService = inject(PokedexService);
  destroyRef = inject(DestroyRef); // Injecter la référence DestroyeRef pour pouvoir unsubscribe. Evite le ngOnDestroy()
  public pokemons!: Pokemon[];
  isNameAvailable(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isAvailable = this.pokemons?.some(
        pokemon => pokemon.name === value
      );

      if (!isAvailable) {
        return null;
      } else {
        return {
          validValidator: value,
        };
      }
    };
  }

  createPokemonForm = this._fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), this.isNameAvailable()],
    ],
    description: ['', [Validators.required, Validators.minLength(2)]],
    imageUrl: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        ),
      ],
    ],
  });

  ngOnInit() {
    this._pokedexService.pokemons$
      .pipe(takeUntilDestroyed(this.destroyRef)) // Permet de unsubscribe lorsque le composant est détruit sans passer par ngOndestroy
      .subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      });
  }

  onSubmit(): void {
    if (this.createPokemonForm.valid) {
      this._pokedexService.addPokemon(this.createPokemonForm.value as Pokemon);
      this.createPokemonForm.reset();
    }
  }
}
