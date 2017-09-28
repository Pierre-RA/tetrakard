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
    this.ended = false;
    let randI = Random.getRange(0, 4);
    let randJ = Random.getRange(0, 4);
    for (let i = 0; i < 4; i++) {
      this.board[i] = [];
      for (let j = 0; j < 4; j++) {
        this.board[i].push(Card.getEmptyCard());
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
    let playingCard = this.adversary.removeCard(response.handCard);
    this.board[i][j] = playingCard;
    this.board[i][j].setOwner(this.adversaryColor);
    this.board[i][j].setState('pink');
    this.setOwners(i, j, 'pink');
  }

  setOwners(i: number, j: number, color: string): void {
    // value left
    if (
      j > 0 &&
      this.board[i][j - 1].values.right <
      this.board[i][j].values.left
    ) {
      this.board[i][j - 1].setOwner(color);
      this.board[i][j - 1].setState(color);
    }

    // value top
    if (
      i > 0 &&
      this.board[i - 1][j].values.bottom <
      this.board[i][j].values.top
    ) {
      this.board[i - 1][j].setOwner(color);
      this.board[i - 1][j].setState(color);
    }

    // value right
    if (
      j < (this.board[i].length - 1) &&
      this.board[i][j + 1].values.left <
      this.board[i][j].values.right
    ) {
      this.board[i][j + 1].setOwner(color);
      this.board[i][j + 1].setState(color);
    }

    // value bottom
    if (
      i < (this.board.length - 1) &&
      this.board[i + 1][j].values.top <
      this.board[i][j].values.bottom
    ) {
      this.board[i + 1][j].setOwner(color);
      this.board[i + 1][j].setState(color);
    }

    this.setScore();
  }

  setScore(): void {
    this.score.user = 0;
    this.score.adversary = 0;
    this.board.forEach(row => {
      row.forEach(card => {
        this.score.adversary += !card.isEmpty() && card.isOwnerAdversary() ? 1 : 0;
        this.score.user += !card.isEmpty() && card.isOwnerUser() ? 1 : 0;
      });
    });
    if (this.isBoardFull()) {
      this.ended = true;
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

  hasPlayerWon(): boolean {
    return this.ended && this.score.user > this.score.adversary;
  }

  hasAdversaryWon(): boolean {
    return this.ended && this.score.adversary > this.score.user;
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
