import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailsComponent } from './trip-details.component';

describe('TripDetailsComponent', () => {
  let component: TripDetailsComponent;
  let fixture: ComponentFixture<TripDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripDetailsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TripDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
