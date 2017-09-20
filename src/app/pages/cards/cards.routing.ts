import { Routes, RouterModule } from '@angular/router';

import { CardsComponent } from './cards.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: CardsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
