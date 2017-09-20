import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from '../../templates/card/card.module';
import { CardsService } from '../../services/cards.service';
import { routing } from './cards.routing';
import { CardsComponent } from './cards.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    routing
  ],
  declarations: [CardsComponent],
  providers: [CardsService]
})
export class CardsModule { }
