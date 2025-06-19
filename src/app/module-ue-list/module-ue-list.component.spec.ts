import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleUEListComponent } from './module-ue-list.component';

describe('ModuleUEListComponent', () => {
  let component: ModuleUEListComponent;
  let fixture: ComponentFixture<ModuleUEListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleUEListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleUEListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
