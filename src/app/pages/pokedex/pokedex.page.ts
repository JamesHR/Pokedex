/* eslint-disable curly */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public pokemonList: any[];
  private offset: number;

  constructor(private pokeApi: PokeapiService) { }

  ngOnInit() {
    this.pokemonList = [];
    this.offset = 0;
    this.loadPokemons();
  }

  async loadPokemons(showMore = false, event?: any) {
    if(showMore)
      this.offset += 25;

    const data = await this.pokeApi.getPokemonList(this.offset);
    this.pokemonList = [...this.pokemonList, ...data];

    if(event)
      event.target.complete();

    if(this.offset === 125)
      this.infiniteScroll.disabled = true;
  }

  onChangeSearch = async (event) => {
    const value = event.detail.value.replace(/\s/g, '');

    if(!value) {
      this.offset = 0;
      this.pokemonList = [];
      this.loadPokemons();
      return;
    }

    await this.pokeApi.findPokemon(value)
      .then(data => this.pokemonList = [data])
      .catch(() => this.pokemonList = []);
  };

}
