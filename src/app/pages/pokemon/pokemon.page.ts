import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {

  pokemon: any;
  public stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };

  constructor(
    private pokeApi: PokeapiService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');
    this.pokemon = await this.pokeApi.findPokemon(index);
    this.loadStats();
    console.log('DETAILS', this.pokemon);
  }

  private loadStats() {
    this.stats = {
      hp: this.pokemon.stats[0].base_stat,
      attack: this.pokemon.stats[1].base_stat,
      defense: this.pokemon.stats[2].base_stat,
      speed: this.pokemon.stats[5].base_stat
    };
  }
}
