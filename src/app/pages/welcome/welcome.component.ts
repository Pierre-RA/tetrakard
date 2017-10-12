import { Component, OnInit } from '@angular/core';

import { BactemonService } from '../../services/bactemon.service';
import { BactemonCard } from '../../logic/bactemon';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  game: string;
  state: string;
  score: {
    adversary: number,
    you: number
  }
  bactemonCards: Array<BactemonCard>;
  foo: BactemonCard;

  constructor(
    private bactemonService: BactemonService
  ) {
    this.game = null;
    this.state = localStorage.getItem('state');
    this.score = {
      adversary: 20,
      you: 20
    }
    this.bactemonCards = [];
    this.bactemonCards.push(this.bactemonService.getRandom());
  }

  ngOnInit() {
    if (localStorage.getItem('state') == 'current') {
      this.game = localStorage.getItem('type');
    }
  }

  continue(): void {
    this.game = localStorage.getItem('type') || 'tetra';
    localStorage.setItem('state', 'current');
  }

  new(): void {
    this.game = localStorage.getItem('type') || 'tetra';
    localStorage.setItem('state', 'current');
  }

  simpleDrop(event): void {
    console.log(event);
    this.foo = event;
  }

}
