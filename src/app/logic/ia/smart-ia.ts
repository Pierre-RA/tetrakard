import { IA, Response, BoardPosition } from './ia';
import { Card } from '../cards';
import { Random } from '../random';

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

  setHand(hand: Array<Card>): void {
    this.hand = hand;
  }

  playTurn(board: Array<Array<Card>>): Response {
    let spot: BoardPosition;
    let best: number;
    let minScore: number = 500;
    let score: number;
    this.hand.forEach((card, index) => {
      spot = this.chooseFreeSpace(board, card);
      if (!score) {
        return null;
      }
      score = this.getScore(board, spot, card);
      minScore = score < minScore ? score : minScore;
      best = score < minScore ? index : best;
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
    let minScore = 500;
    let score = 0;
    let minPosition: BoardPosition = {
      x: -1,
      y: -1
    };
    freespaces.forEach(position => {
      score = this.getScore(board, position, card);
      minScore = score < minScore ? score : minScore;
      minPosition = score < minScore ? position : minPosition;
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
        score -= card.values.right;
      } else {
        if (card.values.right - board[i][j - i].values.left > 0) {
          score += card.values.right - board[i][j - i].values.left;
        }
      }
    } else {
      score += card.values.right;
    }

    // Top
    if (i > 0) {
      if (board[i - 1][j].isEmpty()) {
        score -= card.values.bottom;
      } else {
        if (card.values.bottom - board[i - 1][j].values.top > 0) {
          score += card.values.bottom - board[i - 1][j].values.top;
        }
      }
    } else {
      score += card.values.bottom;
    }

    // Right
    if (j < 3) {
      if (board[i][j + 1].isEmpty()) {
        score -= card.values.left;
      } else {
        if (card.values.left - board[i][j + i].values.right > 0) {
          score += card.values.left - board[i][j + i].values.right;
        }
      }
    } else {
      score += card.values.left;
    }

    // Bottom
    if (i < 3) {
      if (board[i + 1][j].isEmpty()) {
        score -= card.values.top;
      } else {
        if (card.values.top - board[i + 1][j].values.bottom > 0) {
          score += card.values.top - board[i + 1][j].values.bottom;
        }
      }
    } else {
      score += card.values.top;
    }

    return score;
  }

}
