import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommuteComponent } from './add-commute.component';

describe('AddCommuteComponent', () => {
  let component: AddCommuteComponent;
  let fixture: ComponentFixture<AddCommuteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommuteComponent]
    });
    fixture = TestBed.createComponent(AddCommuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
