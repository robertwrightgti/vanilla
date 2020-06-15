import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiComponentsModule } from 'ui-components';
import { ActivityFeedModule } from 'activity-feed-ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UiComponentsModule,
    ActivityFeedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
