import { IA, Response, BoardPosition } from './ia';
import { Card } from '../cards';
import { Random } from '../random';

export class DumbIA implements IA {

  private hand: Array<Card>;

  constructor(private name: string) {
    this.hand = [];
  }

  getHand(): Array<Card> {
    return this.hand;
  }

  setHand(hand: Array<Card>): void {
    this.hand = hand;
  }

  getName(): string {
    return this.name;
  }

  playTurn(board: Array<Array<Card>>): Response {
    let spot: BoardPosition = this.chooseFreeSpace(board);
    if (!spot) {
      return null;
    }
    let rand: number = Random.getRange(0, this.hand.length);
    return {
      handCard: rand,
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
    let rand: number = Random.getRange(0, freespaces.length);
    return freespaces[rand];
  }
}
