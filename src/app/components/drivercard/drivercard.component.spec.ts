import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivercardComponent } from './drivercard.component';

describe('DrivercardComponent', () => {
  let component: DrivercardComponent;
  let fixture: ComponentFixture<DrivercardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrivercardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
