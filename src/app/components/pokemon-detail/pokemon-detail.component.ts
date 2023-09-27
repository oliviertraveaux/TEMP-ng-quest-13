import { Component, Input } from '@angular/core';
import { Pokemon } from '../../shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {
  @Input() selectedPokemon!: Pokemon | null;
}
