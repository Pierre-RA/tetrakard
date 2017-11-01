import { Component, OnInit } from '@angular/core';

import { BactemonService } from '../../../services/bactemon.service';
import { BactemonCard } from '../../../logic/bactemon';

@Component({
  selector: 'bactemon-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  score: {
    adversary: number,
    you: number
  }
  bactemonCards: Array<BactemonCard>;
  boardCard: Array<BactemonCard>;
  foo: BactemonCard;

  constructor(
    private bactemonService: BactemonService
  ) {
    this.score = {
      adversary: 20,
      you: 20
    }
    this.bactemonCards = [];
    this.boardCard = [null, this.bactemonService.getRandom(), null, null, null, null, null, null, null, null, null, null];
    for (let i = 0; i < 6; i++) {
      this.bactemonCards.push(this.bactemonService.getRandom());
    }
  }

  ngOnInit() {
  }

  simpleDrop(i: number, event): void {
    this.foo = event;
    this.boardCard[i] = event.dragData;
  }

  getRandom() {
    this.foo = this.bactemonService.getRandom();
    console.log('get random card', this.foo);
  }

}
