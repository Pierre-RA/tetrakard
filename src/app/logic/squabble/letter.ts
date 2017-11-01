import { Random } from '../random';

export class Letter {
  constructor(
    private name: string,
    private probability: number
  ) {}

  getName(): string {
    return this.name;
  }

  getProbability(): number {
    return this.probability;
  }
}
