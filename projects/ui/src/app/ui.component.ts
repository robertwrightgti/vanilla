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
import { ConfigurationSettings } from 'projects/ui-components/src/lib/interfaces/configuration.interface';


@Component({
    selector: 'ui',
    templateUrl: './ui.component.html',
    styleUrls: ['./ui.component.scss']
})
export class UiComponent extends InitialisedComponent implements OnInit {

    @Input() message: string;

    // Initial config
    private CONFIGURATION_SETTINGS: ConfigurationSettings = {};

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
        this.componentReady();
        this.configurationCompleteSubscription = this.configurationComplete.subscribe((ready) => {
            if (ready && !this.ready) {
                this.cs.settings = this.CONFIGURATION_SETTINGS;
                this.ready = ready;
            }
        });
    }

    ngDestroy() {
        this.configurationCompleteSubscription.unsubscribe();
    }

}
