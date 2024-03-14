import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommuteComponent } from './edit-commute.component';

describe('EditCommuteComponent', () => {
  let component: EditCommuteComponent;
  let fixture: ComponentFixture<EditCommuteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCommuteComponent]
    });
    fixture = TestBed.createComponent(EditCommuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
