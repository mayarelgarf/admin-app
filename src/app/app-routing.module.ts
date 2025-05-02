import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotficationListComponent } from './notification/components/notfication-list/notfication-list.component';
import { MainAppPaths } from './enums/MainAppPaths.enum';
import { UnderConstructionComponent } from './shared/components/under-construction/under-construction.component';

const routes: Routes = [
  {
    path: MainAppPaths.NOTIFICATION,
    loadChildren: () =>
      import('./notification/notification.module').then(
        (m) => m.NotificationModule
      ),
  },{
    path:"**",
    component:UnderConstructionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
