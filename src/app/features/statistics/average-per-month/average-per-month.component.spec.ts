import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AveragePerMonthComponent } from './average-per-month.component';

describe('AveragePerMonthComponent', () => {
  let component: AveragePerMonthComponent;
  let fixture: ComponentFixture<AveragePerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AveragePerMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AveragePerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
