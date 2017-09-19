export class Random {
  static getRange(lower: number, upper: number): number {
    return Math.floor(Math.random() * (upper - lower)) + lower;
  }
  static getCardType(): string {
    let rand = Math.random();
    if (rand > 0.99) {
      return 'legendary';
    }
    if (rand > 0.9) {
      return 'epic';
    }
    if (rand > 0.75) {
      return 'rare';
    }
    if (rand > 0.5) {
      return 'uncommon';
    }
    return 'common';
  }
}
