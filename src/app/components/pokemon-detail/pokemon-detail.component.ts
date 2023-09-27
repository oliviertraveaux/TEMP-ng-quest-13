import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokedexService } from '../../shared/services/pokedex.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {
  @Input() selectedPokemon!: Pokemon | null;
}
