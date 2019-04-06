import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingOneComponent } from './building-one.component';

describe('BuildingOneComponent', () => {
  let component: BuildingOneComponent;
  let fixture: ComponentFixture<BuildingOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
