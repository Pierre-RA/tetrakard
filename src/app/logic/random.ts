export class Random {
  static getRange(lower: number, upper: number): number {
    return Math.floor(Math.random() * (upper - lower)) + lower;
  }

  static getCardType(): string {
    let rand = Math.random();
    if (rand > 0.999) {
      return 'legendary';
    }
    if (rand > 0.99) {
      return 'epic';
    }
    if (rand > 0.9) {
      return 'rare';
    }
    if (rand > 0.5) {
      return 'uncommon';
    }
    return 'common';
  }

  static getElement(): string {
    let rand = this.getRange(0,10);
    switch (rand) {
      case 0:
        return 'earth';
      case 1:
        return 'water';
      case 2:
        return 'fire';
      case 3:
        return 'air';
      case 4:
        return 'metal';
      case 5:
        return 'life';
      case 6:
        return 'death';
      case 7:
        return 'void';
      case 8:
        return 'psy';
      case 9:
        return 'time';
    }
  }
}
