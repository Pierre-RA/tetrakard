import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditsComponent } from './credits.component';
import { routing } from './credits.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [CreditsComponent]
})
export class CreditsModule { }
