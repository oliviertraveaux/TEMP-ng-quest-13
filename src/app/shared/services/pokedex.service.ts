import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PokedexService {
  public pokemonList$: Observable<Pokemon> = [];

  constructor() {}
}
