import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';

import { myRxStompConfig } from './my-rx-stomp.config';
import { BuildingOneComponent } from './building-one/Building-one.component';
import { BuildingTwoComponent } from './building-two/building-two.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildingOneComponent,
    BuildingTwoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
