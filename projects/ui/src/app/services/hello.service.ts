// core
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// 3rd party
import { Observable, of } from 'rxjs';
// this project
import { ConfigurationService } from 'ui-library';

@Injectable({
    providedIn: 'root'
})
export class HelloService {

    private DEFAULT_OPTIONS = {
        headers: new HttpHeaders({
            Accept: 'application/json'
        })
    }

    constructor(
        private http: HttpClient,
        private cs: ConfigurationService
        ) {
    }

    getData(): Observable<any> {
        // Initial set up
        const api = `${this.cs.state.api}/hello`;

        console.log('getData', api)

        return this.http.get(api, this.DEFAULT_OPTIONS);
        // return of("hello");
    }
}
