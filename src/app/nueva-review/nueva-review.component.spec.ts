import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaReviewComponent } from './nueva-review.component';

describe('NuevaReviewComponent', () => {
  let component: NuevaReviewComponent;
  let fixture: ComponentFixture<NuevaReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
