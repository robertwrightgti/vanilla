import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import {
  UiModule,
  HomeComponent
} from 'projects/ui/src/public-api';
import { UiComponent } from 'projects/ui/src/app/ui.component';
import { Router } from '@angular/router';

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
export class UiElementsModule {

  constructor(private injector: Injector, private router: Router) {
  }

  ngDoBootstrap() {
    // create the element
    const uiElement = createCustomElement(UiComponent, { injector: this.injector });
    customElements.define('vanilla-ui', uiElement);

    // go to the plugin's default route
    this.router.initialNavigation();
  }

}
