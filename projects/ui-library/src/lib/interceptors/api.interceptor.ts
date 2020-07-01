import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map } from 'rxjs/operators';
import { TokenService } from '../services/token/token.service';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private ts: TokenService
    ) {}

    /**
     * Interceptor :: interceptor interface
     * @param req HttpRequest
     * @param next HttpHandler
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

        // Lets make the call.
        return next.handle(this.addOptionalHeaders(req))
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        return event.clone();
                    }
                }),
                catchError((error: HttpErrorResponse) => {

                    // If error status is different than 401 we want to skip refresh token
                    // - So we check that and throw the error if it's the case
                    if (error.status !== 401) {
                        return throwError(error);
                    }

                    if (this.refreshTokenInProgress) {
                        // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
                        // – which means the new token is ready and we can retry the request again
                        return this.refreshTokenSubject.pipe(
                            filter(result => result !== null),
                            take(1),
                            switchMap(response => {
                                return next.handle(this.addOptionalHeaders(req)).pipe(
                                    catchError((refreshError: HttpErrorResponse) => {
                                        return throwError(refreshError);
                                    })
                                );
                            })
                        );
                    } else {

                        // Check we have a token to refresh?
                        if (this.ts.token.raw) {

                            this.refreshTokenInProgress = true;

                            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
                            this.refreshTokenSubject.next(null);

                            // Call ts.externalTokenService(this is an Observable that will be returned)
                            return this.ts
                                .ExternalTokenService().pipe(
                                    switchMap((token: any) => {
                                        // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                                        // for the next time the token needs to be refreshed
                                        this.refreshTokenInProgress = false;
                                        this.refreshTokenSubject.next(token);
                                        this.ts.token = token;

                                        return next.handle(this.addOptionalHeaders(req)).pipe(
                                            catchError((refreshError: HttpErrorResponse ) => {
                                                return throwError(refreshError);
                                            })
                                        );
                                    }),
                                    catchError((externalTokenError: HttpErrorResponse ) => {
                                        return throwError(externalTokenError);
                                    })
                                );

                        } else {
                            return throwError(error);
                        }

                    }
                })
            );

    }

    /**
     * addOptionalHeaders :: Set up optional headers.
     * @param request - HttpRequest
     */
    private addOptionalHeaders(request: HttpRequest<any>) {

        // Get the access token from the service &&
        // - get withCredentialsHeaders
        const token = this.ts.token.raw;

        // prevent caching of API response by adding timestamp querystring
        const timestamp = new Date().toISOString();

        // We clone the request, because the original request is immutable
        if (token) {
            return request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + token),
                params: request.params.append('_', timestamp)
            });
        }
        return request.clone();

    }

}
