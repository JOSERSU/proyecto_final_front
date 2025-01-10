import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReviewComponent } from './editar-review.component';

describe('EditarReviewComponent', () => {
  let component: EditarReviewComponent;
  let fixture: ComponentFixture<EditarReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
