// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

// other project modules
import {
  UiComponentsModule,
  Comp1Component,
  Comp2Component,
  Comp3Component
} from 'ui-components';

/**
 * UI-COMPONENTS-ELEMENTS
 */

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    UiComponentsModule
  ],
  providers: [],

})
export class AppModule {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    /**
     * this is where we publish things as angular elements
     * - make sure you name them differently to their internal names
     * - only publish the elements you actually need
     *    (in this case, the activity feed ui)
     */

    const el1 = createCustomElement(Comp1Component, { injector: this.injector });
    customElements.define('element-comp1', el1);

    const el2 = createCustomElement(Comp2Component, { injector: this.injector });
    customElements.define('element-comp2', el2);

    const el3 = createCustomElement(Comp3Component, { injector: this.injector });
    customElements.define('element-comp3', el3);
  }
}
