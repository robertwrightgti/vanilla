import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    public ERROR = new Subject<any>();

    constructor() { }

    getClientErrorMessage(error: Error): string {
        return error.message ?
            error.message :
            error.toString();
    }

    getServerErrorMessage(error: HttpErrorResponse): string {
        return navigator.onLine ?
            error.message :
            'No Internet Connection';
    }

    // public observable
    get error() {
        return this.ERROR;
    }
    set error(error: any) {
        this.ERROR.next(error);
    }
    clearError() {
        this.ERROR.next(null);
    }

}
