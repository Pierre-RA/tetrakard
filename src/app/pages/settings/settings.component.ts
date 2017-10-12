import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  game: string;

  constructor() {
    this.game = 'tetra';
    if (localStorage.getItem('type') != null) {
      this.game = localStorage.getItem('type');
    }
  }

  ngOnInit() {
  }

  select(type: string): void {
    this.game = type;
    localStorage.setItem('type', type);
  }

}
