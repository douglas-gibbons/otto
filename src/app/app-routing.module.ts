import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentityComponent } from './components/identity/identity.component';
import { ControlComponent } from './components/control/control.component';
import { PublishComponent } from './components/publish/publish.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { DevicesComponent } from './components/devices/devices.component';
import { DocsComponent } from './components/docs/docs.component';

const routes: Routes = [
  { path: 'identity', component: IdentityComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'control', component: ControlComponent },
  { path: 'publish', component: PublishComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'docs/:page', component: DocsComponent },
  { path: 'docs', component: DocsComponent },
  { path: '', redirectTo: '/identity', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
