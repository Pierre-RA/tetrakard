import { Routes, RouterModule } from '@angular/router';

import { CreditsComponent } from './credits.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: CreditsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
