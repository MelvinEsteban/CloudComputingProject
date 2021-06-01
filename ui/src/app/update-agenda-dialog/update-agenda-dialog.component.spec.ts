import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAgendaDialogComponent } from './update-agenda-dialog.component';

describe('UpdateAgendaDialogComponent', () => {
  let component: UpdateAgendaDialogComponent;
  let fixture: ComponentFixture<UpdateAgendaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAgendaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAgendaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
