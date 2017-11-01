import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';

import { BoardComponent } from './board.component';
import { BacteryModule } from '../bactery/bactery.module';

@NgModule({
  imports: [
    CommonModule,
    DndModule,
    BacteryModule
  ],
  declarations: [BoardComponent],
  exports: [BoardComponent]
})
export class BoardModule { }
