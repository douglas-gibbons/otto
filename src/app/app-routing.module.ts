import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentityComponent } from './components/identity/identity.component';
import { ControlComponent } from './components/control/control.component';
import { PublishComponent } from './components/publish/publish.component';

const routes: Routes = [
  { path: 'identity', component: IdentityComponent },
  { path: 'control', component: ControlComponent },
  { path: 'publish', component: PublishComponent },
  { path: '', redirectTo: '/identity', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
