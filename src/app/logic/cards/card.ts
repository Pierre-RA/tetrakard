import { Serializable } from '../serialize';
import { Random } from '../random';
import { Element } from '../elements';

const TYPE = 'card';

export class Card implements Serializable<Card> {
  type: string;
  name: string;
  values: Values;
  element: Element;
  highlight: string;
  owner: string;
  id: number;

  deserialize(input: Object): this {
    this.type = input['type'] || 'abstract';
    this.name = input['name'] || '';
    this.values = new Values().deserialize(input['values']);
    this.element = new Element().deserialize(input['element']);
    this.id = Random.getRange(10000,99999);
    return this;
  }

  toggleHighlight(): void {
    this.highlight = this.highlight == 'highlight' ? '' : 'highlight';
  }

  isEmpty(): boolean {
    return this.type == 'abstract';
  }

  isManaSource(): boolean {
    return this.type == 'mana';
  }

  isOwnerAdversary(): boolean {
    return this.owner == 'owner-pink';
  }

  isOwnerUser(): boolean {
    return this.owner == 'owner-blue';
  }

  setOwner(owner: string): void {
    this.owner = owner;
  }

  static getCards(input: Array<Object>): Array<Card> {
    let result = [];
    input.forEach(card => {
      result.push(new Card().deserialize(card));
    });
    return result;
  }
}

export class Values implements Serializable<Values> {
  left: number;
  top: number;
  right: number;
  bottom: number;

  deserialize(input: Object): this {
    this.left = input[0] || input['left'] || 0;
    this.top = input[1] || input['top'] || 0;
    this.right = input[2] || input['right'] || 0;
    this.bottom = input[3] || input['bottom'] || 0;
    return this;
  }
}
