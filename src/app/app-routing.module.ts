import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotficationListComponent } from './components/notfication-list/notfication-list.component';
import { MainAppPaths } from './enums/MainAppPaths.enum';

const routes: Routes = [{
  path:MainAppPaths.NOTIFICATION_LIST,component:NotficationListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
