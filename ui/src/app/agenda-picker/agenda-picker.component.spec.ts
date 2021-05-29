import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaPickerComponent } from './agenda-picker.component';

describe('AgendaPickerComponent', () => {
  let component: AgendaPickerComponent;
  let fixture: ComponentFixture<AgendaPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
