import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAgendaDialogComponent } from './new-agenda-dialog.component';

describe('NewAgendaDialogComponent', () => {
  let component: NewAgendaDialogComponent;
  let fixture: ComponentFixture<NewAgendaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAgendaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAgendaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
