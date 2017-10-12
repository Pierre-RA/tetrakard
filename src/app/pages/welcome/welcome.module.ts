import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';

import { WelcomeComponent } from './welcome.component';
import { routing } from './welcome.routing';

import { EmptyBacteryModule } from '../../templates/bactemon/empty-bactery/empty-bactery.module';
import { BacteryModule } from '../../templates/bactemon/bactery/bactery.module';
import { BactemonService } from '../../services/bactemon.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    DndModule,
    EmptyBacteryModule,
    BacteryModule
  ],
  declarations: [WelcomeComponent],
  providers: [BactemonService]
})
export class WelcomeModule { }
