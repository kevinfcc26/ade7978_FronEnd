import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerCComponent } from './power-c.component';

describe('PowerCComponent', () => {
  let component: PowerCComponent;
  let fixture: ComponentFixture<PowerCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
