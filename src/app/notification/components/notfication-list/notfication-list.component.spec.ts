import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotficationListComponent } from './notfication-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ColorPickerModule } from 'ngx-color-picker';
import { NotificationRoutingModule } from '../../notification-routing.module';

describe('NotficationListComponent', () => {
  let component: NotficationListComponent;
  let fixture: ComponentFixture<NotficationListComponent>;
  let paginator: MatPaginator
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotficationListComponent],
      imports: [
        ReactiveFormsModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatMenuModule,
        MatButtonModule,
        MatInputModule,
        MatListModule,
        MatCardModule,
        MatSelectModule,
        MatSnackBarModule,
        CommonModule,
        NotificationRoutingModule,
        ColorPickerModule

      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotficationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have displayed columns of notification data', () => {
    expect(component.displayedColumns).toEqual([
      'icon',
      'message',
      'metadata',
      'link',
      'createdAt',
      'updatedAt',
      'star'
    ]);
  });

});
