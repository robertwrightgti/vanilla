// core
import { ElementRef, Output, EventEmitter, Input } from '@angular/core';
// 3rd party
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';

// this project
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { TokenService } from '../../services/token/token.service';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { customEmit } from '../../utils/utils';
// import { ConfigurationService } from 'ui-library/lib/services/configuration/configuration.service';
// import { ErrorHandlerService } from 'ui-library/lib/services/error-handler/error-handler.service';
// import { TokenService } from 'ui-library/lib/services/token/token.service';
// import { customEmit } from 'ui-library/lib/utils/utils';

export class InitialisedComponent {

    /**
     * Public variables
     */
    public configurationComplete = new BehaviorSubject<boolean>(false);
    public moduleActive = false;
    public state: any;

    /**
     * Outputs.
     */
    @Output() initialised = new EventEmitter();

    /**
     * Inputs.
     */
    @Input() id = '';
    @Input() basepath: string;

    constructor(
        public el: ElementRef,
        public cs: ConfigurationService,
        public ts: TokenService,
        public ehs: ErrorHandlerService
    ) { }

    @Input() set configuration(config: any) {

        // console.log('here is your config!', config)

        const c = config;

        (() => {
            return new Promise((resolve) => {
              if (c.getToken) {
                this.ts.setExternalTokenService(c.getToken);
                this.ts.ExternalTokenService()
                    .pipe(
                        take(1)
                    )
                    .subscribe((token) => {
                      this.ts.token = token;
                      this.loadConfiguration(c);
                      resolve(true);
                    });
              } else {
                  this.ts.setExternalTokenService(null);
                  this.ts.token = null;
                  this.loadConfiguration(c);
                  resolve(true);
              }
            });
        })();

    }

    @Input()
    get error() {
        // return this.eh.error;
        return this.ehs.error;
    }

    /**
     * componentReady
     */
    componentReady() {
        const self = this;
        this.cs._STATE
            .subscribe((state) => {
                if (state) {
                    // console.log('state', state)
                    setTimeout(() => {
                        self.state = state;
                        self.configurationComplete.next(true);
                    }, 0);
                }
            });

        // Emit that the component is ready.
        customEmit(this, 'initialised', 'initialised', true);
    }

    private loadConfiguration(c) {

        const config = {
            ...{
                id: this.id,
                basepath: this.basepath
            }, ...c
        };
        this.cs.state = config;
    }

}
