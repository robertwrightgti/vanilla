import { NgModule } from '@angular/core';
import { ComponentsComponent } from './components.component';
import { Comp1Component } from './comp1/comp1.component';
import { Comp2Component } from './comp2/comp2.component';

@NgModule({
  declarations: [
    ComponentsComponent,
    Comp1Component,
    Comp2Component
  ],
  imports: [
  ],
  exports: [
    ComponentsComponent,
    Comp1Component,
    Comp2Component
  ]
})
export class ComponentsModule { }
