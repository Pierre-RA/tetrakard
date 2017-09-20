import { Component, OnInit } from '@angular/core';

import { Card } from '../../logic/cards';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  cards: Array<Card>;
  title: string;

  constructor(
    private cardsService: CardsService
  ) {
    this.title = 'TetraKard';
    this.cards = this.cardsService.getAllCards();
  }

  ngOnInit() {
  }

}
