import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Card } from '../../logic/cards';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
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
export class BoardComponent implements OnInit {
  title: string;
  rows: Array<Array<Card>>;
  hand: Array<Card>;
  handState: string;

  constructor(
    private cardsService: CardsService
  ) {
    this.title = 'TetraKard';
    this.handState = 'right';
    this.rows = [];
    this.hand = [];
  }

  ngOnInit() {
    this.initBoard();
    this.initHand();
  }

  initBoard(): void {
    for (let j = 0; j < 4; j++) {
      this.rows[j] = [];
      for (let i = 0; i < 4; i++) {
        this.rows[j].push(this.cardsService.getEmptyCard());
      }
    }
  }

  initHand(): void {
    for (let i = 0; i < 8; i++) {
      this.hand.push(this.cardsService.getRandom());
    }
  }

  onCardSelected(i: number): void {
    this.highlightEmptyCells();
  }

  highlightEmptyCells(): void {
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        this.rows[j][i].toggleHighlight();
      }
    }
  }

  toggleHand(): void {
    this.handState = this.handState == 'right' ? 'left' : 'right';
  }

}
