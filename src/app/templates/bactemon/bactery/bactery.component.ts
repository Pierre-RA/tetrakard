import { Component, OnInit, Input } from '@angular/core';

import { BactemonCard } from '../../../logic/bactemon';

@Component({
  selector: 'bactery',
  templateUrl: './bactery.component.html',
  styleUrls: ['./bactery.component.scss']
})
export class BacteryComponent implements OnInit {

  @Input() card: BactemonCard;
  @Input() type: string;
  image: string;

  constructor() {
  }

  ngOnInit() {
    if (this.card && this.card.gram == 'Gram -') {
      this.type = 'black';
    }
    if (this.card && this.card.gram == 'Gram +') {
      this.type = 'silver';
    }
    if (!this.card) {
      this.image = '';
      if (this.type == 'bactery') {
        this.image = '/assets/img/bactery.png';
      }
      if (this.type == 'antibiotics') {
        this.image = '/assets/img/syringe.png';
      }
    }
  }

}
