import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import {Observable, Subscription} from 'rxjs'
import { action } from './action/action.service'
import { ACTIONS } from './action/action.types'
import { matchParams } from './utils/routes'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    obsBackButton:Subscription;

    constructor(
        private route : ActivatedRoute,
        private router : Router
    ) {
    }

    ngOnInit():void {

        this.obsBackButton = action
            .filter(a => a.name === ACTIONS.BACK_BUTTON)
            .subscribe(a => {
                const path = matchParams(a.data, this.route.firstChild.snapshot.params);
                this.router.navigate([path]);
            });

    }

    ngAfterViewInit():void {

    }

    ngOnDestroy():void {


    }

}
