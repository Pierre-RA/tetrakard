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

  hasElement(): boolean {
    return this.type != 'abstract';
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
      case 'life':
        return 'heartbeat';
      case 'death':
        return 'balance-scale';
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
