import { Component, inject, OnInit } from '@angular/core';
import { PokedexService } from './shared/services/pokedex.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pokedexService = inject(PokedexService);
  title: string = 'Pokedex';

  ngOnInit() {
    this.pokedexService.getPokemons();
  }
}
