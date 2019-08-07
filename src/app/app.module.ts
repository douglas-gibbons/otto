import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ControlComponent } from './components/control/control.component';
import { DocsComponent } from './components/docs/docs.component';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IdentityComponent } from './components/identity/identity.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { MarkdownModule } from 'ngx-markdown';
import { MessagesComponent } from './components/messages/messages.component';
import { MqttModule } from 'ngx-mqtt';
import { mqttServiceOptions } from '../environments/environment';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';
import { PublishComponent } from './components/publish/publish.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';

library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    ControlComponent,
    IdentityComponent,
    MessagesComponent,
    NavComponent,
    PublishComponent,
    SubscribeComponent,
    DocsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    MqttModule.forRoot(mqttServiceOptions),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
