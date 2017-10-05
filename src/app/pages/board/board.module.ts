import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';

import { CardModule } from '../../templates/card/card.module';
import { CardsService } from '../../services/cards.service';

import { routing } from './board.routing';
import { BoardComponent } from './board.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    routing,
    DndModule,
  ],
  declarations: [BoardComponent],
  providers: [CardsService]
})
export class BoardModule { }
