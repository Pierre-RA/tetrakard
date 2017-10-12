import { Serializable } from '../serialize';
import { clone } from '../clone';

export class BactemonCard implements Serializable<BactemonCard> {
  title: string;
  subtext: string;
  image: string;
  gram: string;
  legend: string;
  score: number;
  type: string;
  resistances: Array<string>;

  deserialize(input: Object): this {
    this.title = input['title'];
    this.subtext = input['subtext'];
    this.image = input['image'];
    this.gram = input['gram'];
    this.legend = input['legend'];
    this.score = input['score'];
    if (input['gram'] == 'Gram -') {
      this.type = 'black';
    }
    if (input['gram'] == 'Gram +') {
      this.type = 'silver';
    }
    this.resistances = input['resistances'];
    return this;
  }

  clone(): BactemonCard {
    let result = clone(this);
    return result;
  }

  static getCard(input: Array<Object>): Array<BactemonCard> {
    let result = [];
    input.forEach(card => {
      result.push(new BactemonCard().deserialize(card));
    });
    return result;
  }
}
