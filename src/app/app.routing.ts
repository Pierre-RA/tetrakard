import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', loadChildren: 'app/pages/board/board.module#BoardModule'},
  { path: 'cardlist', loadChildren: 'app/pages/cards/cards.module#CardsModule', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/board' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
