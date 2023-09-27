import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokedexPageComponent } from './pages/pokedex-page/pokedex-page.component';
import { CreatePokemonPageComponent } from './pages/create-pokemon-page/create-pokemon-page.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  { path: '', component: PokedexPageComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },
  { path: 'create', component: CreatePokemonPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
