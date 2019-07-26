import { NgModule } from '@angular/core';

import { RouteReuseStrategy } from '@angular/router';

import { IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MODULES, PROVIDERS } from './app.imports';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [MODULES, AppRoutingModule],
  providers: [
    PROVIDERS,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
