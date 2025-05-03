import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFormComponent } from './notification-form.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NotificationRoutingModule } from '../../notification-routing.module';

describe('NotificationFormComponent', () => {
  let component: NotificationFormComponent;
  let fixture: ComponentFixture<NotificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationFormComponent],
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

    fixture = TestBed.createComponent(NotificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
