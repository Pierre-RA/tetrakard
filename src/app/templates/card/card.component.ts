import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Card } from '../../logic/cards';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('flipState', [
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      state('front', style({
        transform: 'rotateY(0)',
        backgroundColor: 'white'
      })),
      state('blue', style({
        transform: 'rotateY(360deg)',
        backgroundColor: 'skyblue'
      })),
      state('pink', style({
        transform: 'rotateY(0deg)',
        backgroundColor: 'lightpink'
      })),
      transition('front => back', animate('500ms ease-out')),
      transition('back => front', animate('500ms ease-in')),
      transition('blue => pink', animate('1000ms ease-in-out')),
      transition('pink => blue', animate('1000ms ease-in-out'))
    ])
  ]
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Input() position: number;
  @Input() inHand: boolean;
  @Input() state: string;
  @Output() selected: EventEmitter<number> =
    new EventEmitter();

  toggleFlip() {
    if (this.card.state == 'pink') {
      this.card.state = 'blue';
    } else if (this.card.state == 'blue') {
      this.card.state = 'pink';
    }
  }

  ngOnInit() {
    if (this.inHand) {
      this.card.state = 'blue';
    }
  }

  onClick(): void {
    this.selected.emit(this.position);
  }

}
