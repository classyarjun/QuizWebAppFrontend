import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTestComponent } from './quiz-test.component';

describe('QuizTestComponent', () => {
  let component: QuizTestComponent;
  let fixture: ComponentFixture<QuizTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizTestComponent]
    });
    fixture = TestBed.createComponent(QuizTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
