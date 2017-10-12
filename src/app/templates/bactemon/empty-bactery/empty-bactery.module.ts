import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyBacteryComponent } from './empty-bactery.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EmptyBacteryComponent],
  exports: [EmptyBacteryComponent]
})
export class EmptyBacteryModule { }
