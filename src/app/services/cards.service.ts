import { Injectable } from '@angular/core';

import { Random } from '../logic/random';
import { Card } from '../logic/cards';

import * as Common from '../cards/alpha/common.json';
import * as Uncommon from '../cards/alpha/uncommon.json';
import * as Rare from '../cards/alpha/rare.json';
import * as Epic from '../cards/alpha/epic.json';
import * as Legendary from '../cards/alpha/legendary.json';

@Injectable()
export class CardsService {

  common: Array<Card>;
  uncommon: Array<Card>;
  rare: Array<Card>;
  epic: Array<Card>;
  legendary: Array<Card>;

  constructor() {
    this.common = Card.getCards(Common['cards']);
    this.uncommon = Card.getCards(Uncommon['cards']);
    this.rare = Card.getCards(Rare['cards']);
    this.epic = Card.getCards(Epic['cards']);
    this.legendary = Card.getCards(Legendary['cards']);
  }

  getAllCards(): Array<Card> {
    return this.common
      .concat(this.uncommon)
      .concat(this.rare)
      .concat(this.epic)
      .concat(this.legendary);
  }

  getRandom(): Card {
    let type = Random.getCardType();
    let rand = Random.getRange(0, this[type].length);
    let foo = Card.copy(this[type][rand]);
    return Card.copy(this[type][rand]);
    // return new Card().deserialize(this[type][rand]);
  }

  getEmptyCard(): Card {
    return new Card().deserialize({
      values: [0,0,0,0],
    });
  }

  getRandomManaCard(): Card {
    let element = Random.getElement();
    return new Card().deserialize({
      name: element,
      type: 'mana',
      element: element,
      values: [17,17,17,17],
    });
  }

}
