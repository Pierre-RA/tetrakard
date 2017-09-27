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
    trigger('cardHover', [
      state('inactive', style({
        transform: 'scale(1)',
        borderColor: 'grey'
      })),
      state('active', style({
        transform: 'scale(1.05)',
        borderColor: 'gold'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
    trigger('cardHand', [
      state('hidden', style({
        height: '205px',
        position: 'absolute',
        zIndex: 10,
      })),
      state('shown', style({
        height: '205px',
        position: 'absolute',
        transform: 'scale(1.05)',
        zIndex: 200,
      })),
      transition('hidden => shown', animate('100ms ease-in')),
      transition('shown => hidden', animate('100ms ease-out'))
    ]),
    trigger('swap', [
      state('owner-blue', style({
        transform: 'rotateY(360deg)'
      })),
      state('owner-pink', style({
        transform: 'rotateY(360deg)'
      })),
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      transition('blue => pink', animate('500ms ease-in')),
      transition('pink => blue', animate('500ms ease-out'))
    ])
  ]
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Input() position: number;
  @Input() inHand: boolean;
  @Output() selected: EventEmitter<number> =
    new EventEmitter();

  handState: string;
  hoverState: string;

  constructor() { }

  ngOnInit() {
    if (this.inHand) {
      this.handState = 'hidden';
    } else {
      this.hoverState = 'inactive';
    }
  }

  toggleState(): void {
    if (this.card.type != 'abstract') {
      if (this.handState) {
        this.handState = this.handState == 'hidden' ? 'shown' : 'hidden';
      }
      if (this.hoverState) {
        this.hoverState = this.hoverState == 'inactive' ? 'active' : 'inactive';
      }
    }
  }

  onClick(): void {
    this.selected.emit(this.position);
  }

}
