import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotficationListComponent } from './components/notfication-list/notfication-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NotificationFormComponent } from './components/notification-form/notification-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [NotficationListComponent, NotificationFormComponent],
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
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
})
export class NotificationModule {}
