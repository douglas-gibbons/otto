import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ControlComponent } from './components/control/control.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IdentityComponent } from './components/identity/identity.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MqttModule } from 'ngx-mqtt';
import { mqttServiceOptions } from '../environments/environment';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';

// Font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    ControlComponent,
    IdentityComponent,
    MessagesComponent,
    NavComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MqttModule.forRoot(mqttServiceOptions),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
