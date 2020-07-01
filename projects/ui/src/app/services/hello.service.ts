// core
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// 3rd party
import { Observable, of } from 'rxjs';
// this project
import { ConfigurationService, appendToCollection } from 'ui-library';


@Injectable({
    providedIn: 'root'
})
export class HelloService {

    private DEFAULT_OPTIONS = {
        headers: new HttpHeaders({
            Accept: 'application/json'
        })
    }

    private apiHeaders: HttpHeaders = appendToCollection(
        this.cs.state.headers,
        'api',
        this.DEFAULT_OPTIONS.headers
    );

    constructor(
        private http: HttpClient,
        private cs: ConfigurationService
        ) {
    }

    // use custom decorator to do this
    // @AppendHeaders('api')
    getData(): Observable<any> {
        // Initial set up
        // const api = `${this.cs.state.api}/hello`;
        const api = `${this.cs.state.api}/hello`;

        return this.http.get(
            api,
            /*tslint:disable*/
            { headers: this.apiHeaders }
            /*tslint:enable*/
        );
    }
}
