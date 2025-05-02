import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppPaths } from './enums/MainAppPaths.enum';
import {
  NotFoundComponent,
  UnderConstructionComponent,
} from './shared/components';

const routes: Routes = [
  {
    path: MainAppPaths.HOME,
    component: UnderConstructionComponent,
  },
  {
    path: MainAppPaths.PROFILE,
    component: UnderConstructionComponent,
  },
  {
    path: MainAppPaths.NOTIFICATION,
    loadChildren: () =>
      import('./notification/notification.module').then(
        (m) => m.NotificationModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
