import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotficationListComponent } from './components/notfication-list/notfication-list.component';
import { NotificationFormComponent } from './components/notification-form/notification-form.component';
import { NotificationPaths } from './enums/NotificationPaths.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: NotificationPaths.NOTIFICATION_LIST,
    pathMatch: 'full',
  },
  {
    path: NotificationPaths.NOTIFICATION_LIST,
    component: NotficationListComponent,
  },
  { path: NotificationPaths.NEW, component: NotificationFormComponent },
  {
    path: `${NotificationPaths.EDIT}/:id`,
    component: NotificationFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
