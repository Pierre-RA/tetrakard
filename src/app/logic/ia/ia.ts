import { Card } from '../cards';

export interface IA {
  setHand(hand: Array<Card>): void;

  playTurn(board: Array<Array<Card>>): Response;

  getFreeSpaces(board: Array<Array<Card>>): Array<BoardPosition>;

  chooseFreeSpace(board: Array<Array<Card>>): BoardPosition;
}

export interface Response {
  handCard: number;
  boardPosition: BoardPosition;
}

export interface BoardPosition {
  x: number;
  y: number;
}
