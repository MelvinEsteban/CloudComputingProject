import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaUsersDialogComponent } from './agenda-users-dialog.component';

describe('AgendaUsersDialogComponent', () => {
  let component: AgendaUsersDialogComponent;
  let fixture: ComponentFixture<AgendaUsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaUsersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
