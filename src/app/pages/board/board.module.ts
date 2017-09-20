import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from '../../templates/card/card.module';
import { CardsService } from '../../services/cards.service';

import { routing } from './board.routing';
import { BoardComponent } from './board.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    routing
  ],
  declarations: [BoardComponent],
  providers: [CardsService]
})
export class BoardModule { }
