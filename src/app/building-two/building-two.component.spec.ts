import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingTwoComponent } from './building-two.component';

describe('BuildingTwoComponent', () => {
  let component: BuildingTwoComponent;
  let fixture: ComponentFixture<BuildingTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
