import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolEnrollmentModalComponent } from './school-enrollment-modal.component';

describe('SchoolEnrollmentModalComponent', () => {
  let component: SchoolEnrollmentModalComponent;
  let fixture: ComponentFixture<SchoolEnrollmentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolEnrollmentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolEnrollmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
