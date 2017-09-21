import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Random } from '../../logic/random';

import { DumbIA, Response } from '../../logic/ia';
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
        width: '120px',
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
  adversary: DumbIA;
  handState: string;
  playingCard: Card;
  ownerColor: string;
  countUser: number;
  countAdversary: number;

  constructor(
    private cardsService: CardsService
  ) {
    this.title = 'TetraKard';
    this.handState = 'right';
    this.ownerColor = 'owner-blue';
    this.rows = [];
    this.hand = [];
    this.playingCard = null;
    this.adversary = new DumbIA('Dumb-o');
    this.countUser = 0;
    this.countAdversary = 0;
  }

  ngOnInit() {
    this.initBoard();
    this.initHand();
    this.initAdversary();
    this.initTurn();
  }

  initBoard(): void {
    let randI = Random.getRange(0, 4);
    let randJ = Random.getRange(0, 4);
    for (let j = 0; j < 4; j++) {
      this.rows[j] = [];
      for (let i = 0; i < 4; i++) {
        this.rows[j].push(this.cardsService.getEmptyCard());
      }
    }
    this.rows[randI][randJ] = this.cardsService.getRandomManaCard();
  }

  initHand(): void {
    for (let i = 0; i < 8; i++) {
      this.hand.push(this.cardsService.getRandom());
    }
  }

  initAdversary(): void {
    let hand = [];
    for (let i = 0; i < 8; i++) {
      hand.push(this.cardsService.getRandom());
    }
    this.adversary.setHand(hand);
  }

  initTurn(): void {
    let rand = Random.getRange(0,1);
    console.log(rand);
    if (rand == 1) {
      this.adversary.playTurn(this.rows);
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
    if (this.rows[i][j].isEmpty() && this.playingCard) {
      this.rows[i][j] = this.playingCard;
      this.rows[i][j].setOwner(this.ownerColor);
      this.playingCard = null;
      this.highlightEmptyCells();
      this.computeScore(i, j, this.ownerColor);
      this.adversaryTurn();
    }
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

  computeScore(i, j, color): void {
    let current = this.rows[i][j];
    let left = (j > 0) ? this.rows[i][j - 1] : this.cardsService.getEmptyCard();
    let top = (i > 0) ? this.rows[i - 1][j] : this.cardsService.getEmptyCard();
    let right = (j < 3) ? this.rows[i][j + 1] : this.cardsService.getEmptyCard();
    let bottom = (i < 3) ? this.rows[i + 1][j] : this.cardsService.getEmptyCard();

    // value left
    if (left.values.right < current.values.left) {
      left.setOwner(color);
    }

    // value top
    if (top.values.bottom < current.values.top) {
      top.setOwner(color);
    }

    // value right
    if (right.values.left < current.values.right) {
      right.setOwner(color);
    }

    // value bottom
    if (bottom.values.top < current.values.bottom) {
      bottom.setOwner(color);
    }

    this.computeResult();
  }

  computeResult(): void {
    this.countAdversary = 0;
    this.countUser = 0;
    this.rows.forEach(row => {
      row.forEach(card => {
        this.countAdversary += card.isOwnerAdversary() ? 1 : 0;
        this.countUser += card.isOwnerUser() ? 1 : 0;
      });
    });
  }

  adversaryTurn(): void {
    let response: Response = this.adversary.playTurn(this.rows);
    if (response) {
      let i = response.boardPosition.y;
      let j = response.boardPosition.x;
      this.playingCard = this.adversary.getHand()[response.handCard];
      this.rows[i][j] = this.playingCard;
      this.rows[i][j].setOwner(this.adversary.getColor());
      this.playingCard = null;
      this.computeScore(i, j, this.adversary.getColor());
    } else {
      this.showWinner();
    }
  }

  showWinner(): void {
    if (this.countUser > this.countAdversary) {
      console.log('User wins');
    } else {
      console.log('Adversary wins');
    }
  }

}
