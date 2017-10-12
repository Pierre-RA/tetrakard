import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyBacteryComponent } from './empty-bactery.component';

describe('EmptyBacteryComponent', () => {
  let component: EmptyBacteryComponent;
  let fixture: ComponentFixture<EmptyBacteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyBacteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyBacteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
