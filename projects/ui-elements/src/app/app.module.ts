import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import {
  UiModule,
  HomeComponent
} from 'projects/ui/src/public-api';
import { UiComponent } from 'projects/ui/src/app/ui.component';

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
    const uiElement = createCustomElement(UiComponent, { injector: this.injector });
    customElements.define('vanilla-ui', uiElement);
  }

}
