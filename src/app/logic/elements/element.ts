import { Serializable } from '../serialize';

export class Element implements Serializable<Element> {

  type: string;
  fa: string;

  deserialize(input: string): this {
    this.type = input || 'abstract';
    this.fa = Element.getFa(this.type);
    return this;
  }

  export(): string {
    return this.type;
  }

  static getFa(type: string): string {
    switch(type) {
      case 'earth':
        return 'globe';
      case 'water':
        return 'tint';
      case 'fire':
        return 'fire';
      case 'air':
        return 'cloud';
      case 'metal':
        return 'cog';
      case 'wood':
        return 'tree';
      case 'ice':
        return 'snowflake-o';
      case 'lava':
        return 'google-wallet';
      case 'thunder':
        return 'bolt';
      case 'magnetic':
        return 'magnet';
      case 'life':
        return 'heart';
      case 'death':
        return 'gavel';
      case 'void':
        return 'bullseye';
      case 'psy':
        return 'eye';
      case 'time':
        return 'hourglass';
    }
    return 'question';
  }
}
