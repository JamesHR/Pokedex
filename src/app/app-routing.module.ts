import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pokedex',
    loadChildren: () => import('./pages/pokedex/pokedex.module').then( m => m.PokedexPageModule)
  },
  {
    path: '',
    redirectTo: 'pokedex',
    pathMatch: 'full'
  },
  { path: 'pokedex/:index', loadChildren: () => import('./pages/pokemon/pokemon.module').then(m => m.PokemonPageModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
