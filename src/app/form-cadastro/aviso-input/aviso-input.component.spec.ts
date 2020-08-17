import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoInputComponent } from './aviso-input.component';

describe('AvisoInputComponent', () => {
  let component: AvisoInputComponent;
  let fixture: ComponentFixture<AvisoInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
