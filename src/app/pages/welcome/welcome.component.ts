import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  game: string;
  state: string;

  constructor() {
    this.game = null;
    this.state = localStorage.getItem('state');
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

  reset(): void {
    this.game = null;
  }

}
