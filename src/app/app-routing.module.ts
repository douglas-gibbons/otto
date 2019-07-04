import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentityComponent } from './components/identity/identity.component';
import { ControlComponent } from './components/control/control.component';
import { PublishComponent } from './components/publish/publish.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';

const routes: Routes = [
  { path: 'identity', component: IdentityComponent },
  { path: 'control', component: ControlComponent },
  { path: 'publish', component: PublishComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: '', redirectTo: '/identity', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
