// core
import { Component, Input, OnInit, ElementRef } from '@angular/core';

// 3rd party
import { Subscription } from 'rxjs';

// shared
import {
    InitialisedComponent,
    ConfigurationService,
    TokenService,
    ErrorHandlerService
} from 'ui-components';


@Component({
    selector: 'ui',
    templateUrl: './ui.component.html',
    styleUrls: ['./ui.component.scss']
})
export class UiComponent extends InitialisedComponent implements OnInit {

    @Input() message: string;

    private configurationCompleteSubscription: Subscription;

    public ready = false;

    constructor(
        public el: ElementRef,
        public cs: ConfigurationService,
        public ts: TokenService,
        public ehs: ErrorHandlerService
    ) {
        super(el, cs, ts, ehs);
    }

    ngOnInit() {
        console.log('keith2', this.message)

        this.componentReady();
        this.configurationCompleteSubscription = this.configurationComplete.subscribe((ready) => {
            if (ready && !this.ready) {
                this.cs.settings = {}; // cms uses this for some other stuff not relevant here
                this.ready = ready;
            }
        });
    }

    ngDestroy() {
        this.configurationCompleteSubscription.unsubscribe();
    }

}
