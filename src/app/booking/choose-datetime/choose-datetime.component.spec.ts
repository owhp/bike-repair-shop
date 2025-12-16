import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDatetimeComponent } from './choose-datetime.component';

describe('ChooseDatetimeComponent', () => {
  let component: ChooseDatetimeComponent;
  let fixture: ComponentFixture<ChooseDatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseDatetimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
