// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// shared
import { UiLibraryModule, TokenService, ApiInterceptor } from 'ui-library';
// this project
import { UiRoutingModule } from './ui-routing.module';
import { UiComponent } from './ui.component';
import { HomeComponent } from './pages/home/home.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
        HttpClientModule,
        UiRoutingModule,
        UiLibraryModule
    ],
    exports: [
        HomeComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
            deps: [TokenService]
        }
    ],
    bootstrap: [UiComponent]
})
export class UiModule { }
