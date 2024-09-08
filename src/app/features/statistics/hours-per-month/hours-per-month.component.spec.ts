import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursPerMonthComponent } from './hours-per-month.component';

describe('HoursPerMonthComponent', () => {
  let component: HoursPerMonthComponent;
  let fixture: ComponentFixture<HoursPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoursPerMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoursPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
