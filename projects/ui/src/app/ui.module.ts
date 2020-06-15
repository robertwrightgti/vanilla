import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UiComponentsModule } from 'ui-components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { Page2Component } from './pages/page2/page2.component';

/**
 * ACTIVITY-FEED-UI
 */

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Page2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiComponentsModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class UiModule { }
