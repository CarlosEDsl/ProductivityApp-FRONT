import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCardComponent } from './mobile.component';

describe('MobileComponent', () => {
  let component: MobileCardComponent;
  let fixture: ComponentFixture<MobileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
