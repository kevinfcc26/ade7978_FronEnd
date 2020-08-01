import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBComponent } from './power-b.component';

describe('PowerBComponent', () => {
  let component: PowerBComponent;
  let fixture: ComponentFixture<PowerBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
