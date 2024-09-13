import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthConclusionComponent } from './month-conclusion.component';

describe('MonthConclusionComponent', () => {
  let component: MonthConclusionComponent;
  let fixture: ComponentFixture<MonthConclusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthConclusionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthConclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
