import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import {
  Random,
  DumbIA,
  Response,
  Card,
  Board
} from '../../logic';
import { CardsService } from '../../services/cards.service';

const USER_COLOR = 'owner-blue';
const ADVERSARY_COLOR = 'owner-pink';

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
        width: '150px',
        overflow: 'hidden'
      })),
      transition('right => left', animate('100ms ease-in')),
      transition('left => right', animate('100ms ease-out'))
    ])
  ]
})
export class BoardComponent implements OnInit {
  title: string;
  hand: Array<Card>;
  handState: string;
  playingCard: Card;
  board: Board;
  ia: string;

  constructor(
    private cardsService: CardsService
  ) {
    this.title = 'TetraKard';
    this.handState = 'right';
    this.hand = [];
    this.ia = 'Dumb-o';
    this.playingCard = null;
    this.board = new Board(this.cardsService, ADVERSARY_COLOR);
  }

  ngOnInit() {
    this.board.initGame(this.ia);
    this.initHand();
  }

  initHand(): void {
    this.hand = [];
    for (let i = 0; i < 8; i++) {
      this.hand.push(this.cardsService.getRandom());
    }
  }

  onCardSelected(i: number): void {
    this.highlightEmptyCells();
    this.playingCard = this.hand[i];
    let index = this.hand.indexOf(this.hand[i], 0);
    if (index > -1) {
      this.hand.splice(index, 1);
    }
  }

  onBoardCardSelected(i: number, j: number): void {
    if (this.board.getBoard()[i][j].isEmpty() && this.playingCard) {
      this.board.getBoard()[i][j] = this.playingCard;
      this.board.getBoard()[i][j].setOwner(USER_COLOR);
      this.playingCard = null;
      this.highlightEmptyCells();
      this.board.setOwners(i, j, USER_COLOR);
      this.board.adversaryTurn();
    }
  }

  highlightEmptyCells(): void {
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        this.board.getBoard()[j][i].toggleHighlight();
      }
    }
  }

  toggleHand(): void {
    this.handState = this.handState == 'right' ? 'left' : 'right';
  }

  onReset(ia?: string): void {
    if (ia == 'Dumb-o') {
      this.ia = ia;
      this.board.initGame(ia, 'dumb');
    } else if (ia == 'Smart-o') {
      this.ia = ia;
      this.board.initGame(ia, 'smart');
    } else {
      this.board.initGame(this.ia);
    }
    this.initHand();
  }

}
