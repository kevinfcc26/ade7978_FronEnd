import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerAComponent } from './power-a.component';

describe('PowerAComponent', () => {
  let component: PowerAComponent;
  let fixture: ComponentFixture<PowerAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
