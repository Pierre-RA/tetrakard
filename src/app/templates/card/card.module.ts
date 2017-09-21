import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card.component';
import { NumberPipe } from './number.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CardComponent, NumberPipe],
  exports: [CardComponent]
})
export class CardModule { }
