import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    _STORE = new BehaviorSubject<any>(null);
    _STATE = new BehaviorSubject<any>(null);
    settings: any = {};

    constructor() { }

    @Input() set state(state: any) {
        // console.log('cs state set', state)
        const initial = this._STATE.getValue();
        if (initial) {
            this._STATE.next({ ...initial, ...state });
        } else {
            this._STATE.next(state);
        }
    }

    get state() {
        return this._STATE.getValue();
    }

    @Input() set store(store: any) {
        const initial = this._STORE.getValue();
        if (initial) {
            this._STORE.next({ ...initial, ...store });
        } else {
            this._STORE.next(store);
        }
    }

    get store() {
        return this._STORE.getValue();
    }

}
