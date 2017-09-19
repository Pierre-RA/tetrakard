import { Serializable } from '../serialize';
import { Card } from './card';

export class CommonCard extends Card implements Serializable<CommonCard> {

  deserialize(input: Object): this {
    super.deserialize(input);
    return this;
  }

  static generateRandom(): CommonCard {
    return new CommonCard().deserialize({});
  }
}
