import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteStepperComponent } from './route-stepper.component';

describe('RouteStepperComponent', () => {
  let component: RouteStepperComponent;
  let fixture: ComponentFixture<RouteStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
