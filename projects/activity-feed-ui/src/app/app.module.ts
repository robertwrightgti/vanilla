import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UiComponentsModule } from 'ui-components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/**
 * ACTIVITY-FEED-UI
 */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
