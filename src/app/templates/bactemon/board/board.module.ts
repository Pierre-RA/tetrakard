import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';

import { BoardComponent } from './board.component';
import { EmptyBacteryModule } from '../empty-bactery/empty-bactery.module';
import { BacteryModule } from '../bactery/bactery.module';

@NgModule({
  imports: [
    CommonModule,
    DndModule,
    EmptyBacteryModule,
    BacteryModule
  ],
  declarations: [BoardComponent],
  exports: [BoardComponent]
})
export class BoardModule { }
