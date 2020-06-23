// core
import { Injectable } from '@angular/core';
// 3rd party
import { Observable, from, BehaviorSubject } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';
// this project
// import { ConfigurationService } from 'ui-library/lib/services/configuration/configuration.service';


@Injectable({
    providedIn: 'root'
})
export class TokenService {

    __MODULE_ACTIVE = new BehaviorSubject<boolean>(null);
    __IS_LINKED = new BehaviorSubject<boolean>(null);
    __RENEWING = false;

    /**
     * Variables
     */
    private TOKEN: any;
    private TOKENDATA: any;
    private externalTokenService: any;

    constructor(
        public cs: ConfigurationService
    ) {
    }

    /**
     * Service methods.
     */
    get token() {
        return {
            raw: this.TOKEN,
            data: this.TOKENDATA,
            isModuleActive: (this.TOKENDATA) ? ((this.TOKENDATA.tags.cms) ?
                (((this.TOKENDATA.tags.cms).length > 0) ? true : false) : false) : false,
            isLinked: (this.TOKENDATA && this.TOKENDATA.linked),
            system: (this.TOKENDATA && this.TOKENDATA.media) ? ((this.TOKENDATA.media.toLowerCase()).indexOf('targetjobs') > -1 ? 'tj' : 'gi') : 'tj'
        };
    }
    set token(token: any) {
        this.updateToken(token);
    }

    setExternalTokenService(externalTokenService: Promise<any>) {
        this.externalTokenService = externalTokenService;
    }
    ExternalTokenService(): Observable<any> {
        return from(this.externalTokenService());
    }

    /**
     * updateToken :: update the token parameters with new token value.
     * @param token this should be a JWT
     */
    private updateToken(token: any) {
        if (token) {
            if (token.length > 0) {
                const tokenMid = token.split('.')[1];
                try {
                    const tokenDecoded: any = atob(tokenMid);
                    const tokenDecodedParsed: any = JSON.parse(tokenDecoded);
                    this.TOKENDATA = tokenDecodedParsed;
                    this.TOKEN = token;
                    this.cs.state = { token };
                    this.__MODULE_ACTIVE.next(this.token.isModuleActive);
                    this.__IS_LINKED.next(this.token.isLinked);
                    this.__RENEWING = false;
                } catch (err) {
                    this.clearToken();
                    this.__RENEWING = false;
                }
            } else {
                this.clearToken();
                this.__RENEWING = false;
            }
        } else {
            this.clearToken();
            this.__RENEWING = false;
        }
    }

    /**
     * clearToken :: reset the token back to initial state.
     */
    clearToken() {
        this.__RENEWING = true;
        this.TOKENDATA = null;
        this.TOKEN = null;
        this.cs.state = { token: null };
    }

    /**
     * renewToken :: Used to null the token to we can get another one from the host.
     */
    renewToken(cb?: any) {
        this.clearToken();
        this.__RENEWING = true;
        console.log('plugin: clearing token', this.token);
        return this.externalTokenService().then((token) => {
            this.updateToken(token);
            if (cb) {
                cb();
            }
        });
    }

    /**
     * interactionProxy :: call the emitInteraction in the configuration service, to tell the host we have been doign stuff in the plugin.
     */
    interactionProxy() {
        this.cs.emitInteraction();
    }

}
