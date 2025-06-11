import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleUEComponent } from './module-ue.component';

describe('ModuleUEComponent', () => {
  let component: ModuleUEComponent;
  let fixture: ComponentFixture<ModuleUEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleUEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleUEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
