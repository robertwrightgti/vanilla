import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import {
  ActivityFeedModule,
  HomeComponent
} from 'activity-feed-ui';

/**
 * ACTIVITY-FEED-UI-ELEMENTS
 */

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ActivityFeedModule
  ],
  providers: []
})
export class AppModule {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    console.log('boostrapping!')

    const el1 = createCustomElement(HomeComponent, { injector: this.injector });
    customElements.define('element-home', el1);
  }

}
