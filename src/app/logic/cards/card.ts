import { Serializable } from '../serialize';
import { Random } from '../random';
import { Element } from '../elements';
import * as Cards from './cards.json';

const TYPE = 'card';

export class Card implements Serializable<Card> {
  type: string;
  name: string;
  values: Values;
  element: Element;

  deserialize(input: Object): this {
    this.type = input['type'] || 'abstract';
    this.name = input['name'] || '';
    this.values = new Values().deserialize(input['values']);
    this.element = new Element().deserialize(input['element']);
    return this;
  }

  static getRandom(): Card {
    let type = Random.getCardType();
    let upper = Cards[type].length;
    let rand = Random.getRange(0, upper);
    return new Card().deserialize(Cards[type][rand]);
  }

  static getEmpty(): Card {
    return new Card().deserialize({
      values: {},
    });
  }
}

export class Values implements Serializable<Values> {
  left: number;
  top: number;
  right: number;
  bottom: number;

  deserialize(input: Object): this {
    this.left = input[0] || 0;
    this.top = input[1] || 0;
    this.right = input[2] || 0;
    this.bottom = input[3] || 0;
    return this;
  }
}
