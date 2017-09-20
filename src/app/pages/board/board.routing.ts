import { Routes, RouterModule } from '@angular/router';

import { BoardComponent } from './board.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: BoardComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
