import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bactemon-empty-bactery',
  templateUrl: './empty-bactery.component.html',
  styleUrls: ['./empty-bactery.component.scss']
})
export class EmptyBacteryComponent implements OnInit {

  @Input() type: string;
  image: string;

  constructor() { }

  ngOnInit() {
    this.image = '';
    if (this.type == 'bactery') {
      this.image = '/assets/img/bactery.png';
    }
    if (this.type == 'antibiotics') {
      this.image = '/assets/img/syringe.png';
    }
  }

}
