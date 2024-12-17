import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReadmeComponent } from './test-readme.component';

describe('TestReadmeComponent', () => {
  let component: TestReadmeComponent;
  let fixture: ComponentFixture<TestReadmeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestReadmeComponent]
    });
    fixture = TestBed.createComponent(TestReadmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
