import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import {
  UiModule,
  HomeComponent
} from 'projects/ui/src/public-api';

/**
 * UI-ELEMENTS
 */

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    UiModule
  ],
  providers: []
})
export class AppModule {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el1 = createCustomElement(HomeComponent, { injector: this.injector });
    customElements.define('element-home', el1);
  }

}
