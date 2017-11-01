import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', loadChildren: 'app/pages/welcome/welcome.module#WelcomeModule'},
  { path: 'game', loadChildren: 'app/pages/board/board.module#BoardModule', pathMatch: 'full' },
  { path: 'cardlist', loadChildren: 'app/pages/cards/cards.module#CardsModule', pathMatch: 'full' },
  { path: 'settings', loadChildren: 'app/pages/settings/settings.module#SettingsModule', pathMatch: 'full' },
  { path: 'credits', loadChildren: 'app/pages/credits/credits.module#CreditsModule', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/board' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
