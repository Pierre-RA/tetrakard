import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Card } from './logic/cards';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('handState', [
      state('left', style({
        width: '150px'
      })),
      state('right', style({
        width: '40px',
        overflow: 'hidden'
      })),
      transition('right => left', animate('100ms ease-in')),
      transition('left => right', animate('100ms ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit {
  title: string;
  rows: Array<Array<Card>>;
  hand: Array<Card>;
  handState: string;

  constructor() {
    this.title = 'TetraKard';
    this.handState = 'right';
    this.rows = [];
    this.hand = [
      Card.getRandom(),
      Card.getRandom(),
      Card.getRandom(),
      Card.getRandom(),
      Card.getRandom(),
      Card.getRandom(),
      Card.getRandom(),
      Card.getRandom()
    ];
  }

  ngOnInit() {
    this.rows = [[
      Card.getRandom(),
      Card.getEmpty(),
      Card.getRandom(),
      Card.getRandom()
    ], [
      Card.getRandom(),
      Card.getRandom(),
      Card.getRandom(),
      Card.getRandom()
    ], [
      Card.getRandom(),
      Card.getRandom(),
      Card.getRandom(),
      Card.getRandom()
    ], [
      Card.getRandom(),
      Card.getRandom(),
      Card.getRandom(),
      Card.getRandom()
    ]];
  }

  toggleHand() {
    this.handState = this.handState == 'right' ? 'left' : 'right';
  }

}
