import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UeFormModalComponent } from './ue-form-modal.component';

describe('UeFormModalComponent', () => {
  let component: UeFormModalComponent;
  let fixture: ComponentFixture<UeFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UeFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UeFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
