import { IA, Response, BoardPosition } from './ia';
import { Card } from '../cards';
import { Random } from '../random';

const SCORE_MODAL = 10;

export class SmartIA implements IA {

  private hand: Array<Card>;

  constructor(private name: string) {
    this.hand = [];
  }

  getName(): string {
    return this.name;
  }

  getHand(): Array<Card> {
    return this.hand;
  }

  removeCard(i: number): Card {
    let card: Card = this.hand[i];
    let index = this.hand.indexOf(this.hand[i], 0);
    if (index > -1) {
      this.hand.splice(index, 1);
    }
    return card;
  }

  setHand(hand: Array<Card>): void {
    this.hand = hand;
  }

  playTurn(board: Array<Array<Card>>): Response {
    let spot: BoardPosition;
    let best: number;
    let minScore: number = 0;
    let score: number;
    this.hand.forEach((card, index) => {
      spot = this.chooseFreeSpace(board, card);
      if (!spot) {
        return null;
      }
      score = this.getScore(board, spot, card);
      if (score > minScore) {
        minScore = score;
        best = index;
      }
    });
    return {
      handCard: best,
      boardPosition: spot
    };
  }

  getFreeSpaces(board: Array<Array<Card>>): Array<BoardPosition> {
    let result: Array<BoardPosition> = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j].isEmpty()) {
          result.push({
            x: j,
            y: i
          });
        }
      }
    }
    return result;
  }

  chooseFreeSpace(board: Array<Array<Card>>, card?: Card): BoardPosition {
    let freespaces: Array<BoardPosition> = this.getFreeSpaces(board);
    if (!freespaces) {
      return null;
    }
    let minScore = 0;
    let score = 0;
    let minPosition: BoardPosition = {
      x: -1,
      y: -1
    };
    freespaces.forEach(position => {
      score = this.getScore(board, position, card);
      if (score > minScore) {
        minScore = score;
        minPosition = position;
      }
    });
    return minPosition;
  }

  getScore(board: Array<Array<Card>>, position: BoardPosition, card: Card): number {
    let i = position.y;
    let j = position.x;
    let score = 0;

    // Left
    if (j > 0) {
      if (board[i][j - 1].isEmpty()) {
        score += 1 / (card.values.left + SCORE_MODAL);
      } else {
        score += card.values.left - board[i][j - 1].values.right > 0 ? 1 : 0;
        score += 1 / (SCORE_MODAL + Math.abs(card.values.left - board[i][j - 1].values.right));
      }
    } else {
      score += 1 / (card.values.left + SCORE_MODAL);
    }

    // Top
    if (i > 0) {
      if (board[i - 1][j].isEmpty()) {
        score += 1 / (card.values.top + SCORE_MODAL);
      } else {
        score += card.values.top - board[i - 1][j].values.bottom > 0 ? 1 : 0;
        score += 1 / (SCORE_MODAL + Math.abs(card.values.top - board[i - 1][j].values.bottom));
      }
    } else {
      score += 1 / (card.values.top + SCORE_MODAL);
    }

    // Right
    if (j < board[i].length - 1) {
      if (board[i][j + 1].isEmpty()) {
        score += 1 / (card.values.right + SCORE_MODAL);
      } else {
        score += card.values.right - board[i][j + 1].values.left > 0 ? 1 : 0;
        score += 1 / (SCORE_MODAL + Math.abs(card.values.right - board[i][j + 1].values.left));
      }
    } else {
      score += 1 / (card.values.right + SCORE_MODAL);
    }

    // Bottom
    if (i < board.length - 1) {
      if (board[i + 1][j].isEmpty()) {
        score += 1 / (card.values.bottom + SCORE_MODAL);
      } else {
        score += card.values.bottom - board[i + 1][j].values.top > 0 ? 1 : 0;
        score += 1 / (SCORE_MODAL + Math.abs(card.values.bottom - board[i + 1][j].values.top));
      }
    } else {
      score += 1 / (card.values.bottom + SCORE_MODAL);
    }

    return score;
  }

}
