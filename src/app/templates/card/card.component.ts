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
        zIndex: '10',
        transform: 'scale(1)',
        borderColor: 'grey'
      })),
      state('active', style({
        zIndex: '200',
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
      })),
      state('shown', style({
        height: '205px',
        position: 'absolute',
        transform: 'scale(1.05)'
      })),
      transition('hidden => shown', animate('100ms ease-in')),
      transition('shown => hidden', animate('100ms ease-out'))
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
  owner: string;

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
