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

  deserialize(input: Object): this {
    this.type = input['type'] || 'abstract';
    this.name = input['name'] || '';
    this.values = new Values().deserialize(input['values']);
    this.element = new Element().deserialize(input['element']);
    return this;
  }

  toggleHighlight(): void {
    this.highlight = this.highlight == 'highlight' ? '' : 'highlight';
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
    this.left = input[0] || 0;
    this.top = input[1] || 0;
    this.right = input[2] || 0;
    this.bottom = input[3] || 0;
    return this;
  }
}
