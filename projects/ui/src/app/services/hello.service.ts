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

    // use custom decorator to do this
    // @AppendHeaders('api')
    getData(): Observable<any> {
        // Initial set up
        // const api = `${this.cs.state.api}/hello`;
        const api = `${this.cs.state.api}/employees`;

        return this.http.get(
            api,
            { headers: this.appendHeaders('api', this.DEFAULT_OPTIONS.headers) }
        );
    }

    // move into utils file
    private appendHeaders(key: string, headers: HttpHeaders) {
        if (this.cs.state.headers) {
          if (this.cs.state.headers[key]) {
            for (const k of Object.keys(this.cs.state.headers[key])) {
              headers = headers.append(k, this.cs.state.headers[key][k]);
            }
          }
        }
        return headers;
      }
}
