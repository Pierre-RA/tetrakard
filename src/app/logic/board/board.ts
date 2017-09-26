import { Random } from '../random';
import { IA, DumbIA, SmartIA, Response } from '../ia';
import { Card } from '../cards';

import { CardsService } from '../../services/cards.service';

export class Board {
  board: Array<Array<Card>>;
  playerTurn: boolean;
  ended: boolean;
  adversary: IA;
  score: Score;

  constructor(
    private cardsService: CardsService,
    private adversaryColor: string
  ) {
    this.board = [];
    this.playerTurn = false;
    this.adversary = null;
    this.ended = false;
  }

  initGame(name: string, type?: string): void {
    this.resetScore();
    let randI = Random.getRange(0, 4);
    let randJ = Random.getRange(0, 4);
    for (let i = 0; i < 4; i++) {
      this.board[i] = [];
      for (let j = 0; j < 4; j++) {
        this.board[i].push(this.cardsService.getEmptyCard());
      }
    }
    this.board[randI][randJ] = this.cardsService.getRandomManaCard();
    this.initAdversary(name, type);
  }

  initAdversary(name: string, type?: string): void {
    if (type == 'smart') {
      this.adversary = new SmartIA(name);
    } else {
      this.adversary = new DumbIA(name);
    }
    let hand = [];
    for (let i = 0; i < 8; i++) {
      hand.push(this.cardsService.getRandom());
    }
    this.adversary.setHand(hand);
  }

  initTurn(): void {
    let rand = Random.getRange(0,2);
    this.playerTurn = true;
    if (rand == 1) {
      this.adversaryTurn();
      this.playerTurn = false;
    }
  }

  adversaryTurn(): void {
    if (this.isBoardFull()) {
      return;
    }
    let response: Response = this.adversary.playTurn(this.board);
    let i = response.boardPosition.y;
    let j = response.boardPosition.x;
    let playingCard = this.adversary.getHand()[response.handCard];
    this.board[i][j] = playingCard;
    this.board[i][j].setOwner(this.adversaryColor);
    this.setOwners(i, j, this.adversaryColor);
  }

  setOwners(i: number, j: number, color: string): void {
    let current = this.board[i][j];
    let left = (j > 0) ? this.board[i][j - 1] : this.cardsService.getEmptyCard();
    let top = (i > 0) ? this.board[i - 1][j] : this.cardsService.getEmptyCard();
    let right = (j < 3) ? this.board[i][j + 1] : this.cardsService.getEmptyCard();
    let bottom = (i < 3) ? this.board[i + 1][j] : this.cardsService.getEmptyCard();

    // value left
    if (left.values.right < current.values.left) {
      left.setOwner(color);
      console.log('left is ' + color);
    }

    // value top
    if (top.values.bottom < current.values.top) {
      top.setOwner(color);
      console.log('top is ' + color);
    }

    // value right
    if (right.values.left < current.values.right) {
      right.setOwner(color);
      console.log('right is ' + color);
    }

    // value bottom
    if (bottom.values.top < current.values.bottom) {
      bottom.setOwner(color);
      console.log('bottom is ' + color);
    }

    this.setScore();
  }

  setScore(): void {
    this.score.user = 0;
    this.score.adversary = 0;
    this.board.forEach(row => {
      row.forEach(card => {
        this.score.adversary += card.isOwnerAdversary() ? 1 : 0;
        this.score.user += card.isOwnerUser() ? 1 : 0;
      });
    });
    if (this.isBoardFull()) {
      this.ended = true;
      console.log('you: ' + this.score.user);
      console.log(this.adversary.getName() + ': ' + this.score.adversary);
    }
  }

  isPlayerTurn(): boolean {
    return this.playerTurn;
  }

  getBoard(): Array<Array<Card>> {
    return this.board;
  }

  isBoardFull(): boolean {
    let result = true;
    this.board.forEach(row => {
      row.forEach(card => {
        if (card.isEmpty()) {
          result = false;
        }
      });
    });
    return result;
  }

  resetScore(): void {
    this.score = {
      user: 0,
      adversary: 0
    };
  }
}

export interface Score {
  user: number;
  adversary: number;
}
