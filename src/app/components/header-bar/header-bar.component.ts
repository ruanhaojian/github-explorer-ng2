import { Component, OnInit, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }          from '@angular/common';
import { ROUTES } from '../../utils/routes';

@Component({
    selector: 'header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit, OnDestroy, OnChanges{
    showLoading: boolean;
    doneLoading: boolean;
    loadFailed: boolean;

    constructor(
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.showLoading = false;
        this.doneLoading = false;
        this.loadFailed = false;
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}): void  {
        for (let propName in changes) {
            let chng = changes[propName];
            let cur  = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);


        }
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {

    }

    isUserPage(route): boolean {
        return route === undefined || // React Router returns undefined on root?
            route === ROUTES.USER_DETAIL ||
            route === ROUTES.HOME;
    }

    shouldShowBackBtn(route): any{
        switch (route) {
            case ROUTES.HOME: return false;
            case ROUTES.USER_DETAIL: return false;
            case ROUTES.USER_REPO_LIST: return ROUTES.USER_DETAIL;
            case ROUTES.REPO_DETAIL: return ROUTES.USER_REPO_LIST;
            default: return false;
        }
    }
}
