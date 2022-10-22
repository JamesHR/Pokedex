import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokedexPageRoutingModule } from './pokedex-routing.module';

import { PokedexPage } from './pokedex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokedexPageRoutingModule
  ],
  declarations: [PokedexPage]
})
export class PokedexPageModule {}
