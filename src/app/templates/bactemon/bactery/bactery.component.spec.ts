import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacteryComponent } from './bactery.component';

describe('BacteryComponent', () => {
  let component: BacteryComponent;
  let fixture: ComponentFixture<BacteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
