import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiComponentsModule } from 'components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UiComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
