import { Letter } from './letter';

export class SetEn {
  pool: Array<Letter>;

  constructor() {
    this.generatePool();
  }

  generatePool() {
    this.pool = [];
    for (let i = 0; i < 13; i++) {
      this.pool.push(new Letter('e', 1));
    }
    for (let i = 0; i < 9; i++) {
      this.pool.push(new Letter('t', 1));
    }
    for (let i = 0; i < 8; i++) {
      this.pool.push(new Letter('a', 1));
    }
    for (let i = 0; i < 8; i++) {
      this.pool.push(new Letter('o', 1));
    }
    for (let i = 0; i < 7; i++) {
      this.pool.push(new Letter('i', 1));
    }
    for (let i = 0; i < 7; i++) {
      this.pool.push(new Letter('n', 1));
    }
    for (let i = 0; i < 6; i++) {
      this.pool.push(new Letter('s', 1));
    }
    for (let i = 0; i < 6; i++) {
      this.pool.push(new Letter('h', 1));
    }
  }

  getSize(): number {
    return this.pool.length;
  }

  getLetterFromPool(): Letter {
    return null;
  }
}
