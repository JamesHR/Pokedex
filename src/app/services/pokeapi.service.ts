/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_URL = 'https://pokeapi.co/api/v2/';

// Retro (png)
// const IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

// Vector (svg)
// const IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';

// ArtWork (png)
const IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/';


@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http: HttpClient) { }

  getPokemonList = (offset = 0) =>
    this.http.get(`${API_URL}pokemon?offset=${offset}&limit=25`).pipe(

      map(result => result['results']),

      map(list => list.map((pokemon, index) => {
        pokemon.id = offset + index + 1;
        pokemon.image = this.getPokemonImageUrl(pokemon.id);
        return pokemon;
      }))
    ).toPromise();

  findPokemon = (searchValue: number | string) =>
    this.http.get(`${API_URL}pokemon/${searchValue}`).pipe(
      map(pokemon => {
        pokemon['image'] = this.getPokemonImageUrl(pokemon['id']);
        pokemon['id'] = pokemon['id'];
        return pokemon;
      }))
    .toPromise();

  private getPokemonImageUrl =(id: number) => `${IMAGE_URL}${id}.png`;

}
