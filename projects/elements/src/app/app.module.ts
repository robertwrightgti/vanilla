// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

// other project modules
import {
  ComponentsModule,

  // Comp1Component,
  // Comp2Component
} from 'components';
import { Comp1Component } from 'projects/components/src/lib/comp1/comp1.component';
import { Comp2Component } from 'projects/components/src/lib/comp2/comp2.component';


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
    const el1 = createCustomElement(Comp1Component, { injector: this.injector });
    customElements.define('lib-comp1', el1);

    const el2 = createCustomElement(Comp2Component, { injector: this.injector });
    customElements.define('lib-comp2', el2);
  }
}
