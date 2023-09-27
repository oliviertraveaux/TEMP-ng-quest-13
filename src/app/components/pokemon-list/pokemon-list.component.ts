import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokedexService } from '../../shared/services/pokedex.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  pokedexService = inject(PokedexService);

  @Input() pokemons: Pokemon[] = [];

  trackByIndex(index: number) {
    return index;
  }

  OnselectPokemon(index: number) {
    this.pokedexService.selectPokemon(index);
  }
}
