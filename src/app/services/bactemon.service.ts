import { Injectable } from '@angular/core';

import { Random } from '../logic/random';
import { BactemonCard } from '../logic/bactemon';

import * as All from '../cards/bactemon/all.json';

@Injectable()
export class BactemonService {

  cards: Array<BactemonCard>;

  constructor() {
    this.cards = BactemonCard.getCard(All['cards']);
  }

  getRandom(): BactemonCard {
    return this.cards[Random.getRange(0, this.cards.length)];
  }

}
