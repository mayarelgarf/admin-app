import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotficationListComponent } from './notfication-list.component';

describe('NotficationListComponent', () => {
  let component: NotficationListComponent;
  let fixture: ComponentFixture<NotficationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotficationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotficationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
