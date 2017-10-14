import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeComponent } from './welcome.component';
import { routing } from './welcome.routing';

import { BoardModule } from '../../templates/bactemon/board/board.module';

import { BactemonService } from '../../services/bactemon.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    BoardModule
  ],
  declarations: [WelcomeComponent],
  providers: [BactemonService]
})
export class WelcomeModule { }
