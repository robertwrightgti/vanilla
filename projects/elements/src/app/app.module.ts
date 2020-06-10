// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

// other project modules
import {
  ComponentsModule,
  Comp1Component,
  Comp2Component,
  Comp3Component
} from 'components';


@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    ComponentsModule
  ],
  providers: [],

})
export class AppModule {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el1 = createCustomElement(Comp1Component, { injector: this.injector });
    customElements.define('lib-comp1', el1);

    const el2 = createCustomElement(Comp2Component, { injector: this.injector });
    customElements.define('lib-comp2', el2);

    const el3 = createCustomElement(Comp3Component, { injector: this.injector });
    customElements.define('lib-comp3', el3);
  }
}
