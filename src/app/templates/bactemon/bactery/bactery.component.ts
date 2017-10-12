import { Component, OnInit, Input } from '@angular/core';

import { BactemonCard } from '../../../logic/bactemon';

@Component({
  selector: 'bactery',
  templateUrl: './bactery.component.html',
  styleUrls: ['./bactery.component.scss']
})
export class BacteryComponent implements OnInit {

  @Input() card: BactemonCard;
  type: string;

  constructor() {
    if (this.card && this.card.gram == 'Gram -') {
      console.log('-');
      this.type = 'black';
    }
    if (this.card && this.card.gram == 'Gram +') {
      console.log('+');
      this.type = 'silver';
    }
  }

  ngOnInit() {
  }

}
