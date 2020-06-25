// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// shared
import { UiLibraryModule } from 'ui-library';

// this project
import { UiRoutingModule } from './ui-routing.module';
import { UiComponent } from './ui.component';
import { HomeComponent } from './pages/home/home.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';

/**
 * UI
 */

@NgModule({
    declarations: [
        UiComponent,
        HomeComponent,
        Page2Component,
        Page3Component
    ],
    imports: [
        BrowserModule,
        UiRoutingModule,
        UiLibraryModule
    ],
    exports: [
        HomeComponent
    ],
    providers: [],
    bootstrap: [UiComponent]
})
export class UiModule { }
