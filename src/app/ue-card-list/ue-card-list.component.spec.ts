import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UeCardListComponent } from './ue-card-list.component';

describe('UeCardListComponent', () => {
  let component: UeCardListComponent;
  let fixture: ComponentFixture<UeCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UeCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UeCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
