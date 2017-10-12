import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacteryComponent } from './bactery.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BacteryComponent],
  exports: [BacteryComponent]
})
export class BacteryModule { }
