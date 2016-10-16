import { Component, OnInit, OnDestroy, OnChanges, SimpleChange, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }          from '@angular/common';
import { ROUTES } from '../../utils/routes';

import { action } from '../../action/action.service'
import { ACTIONS } from '../../action/action.types'

@Component({
    selector: 'header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit{
    showLoading: boolean;
    doneLoading: boolean;
    loadFailed: boolean;

    obsTriggerLoadAnimation: any;
    obsTriggerLoadAnimationDone: any;
    obsRequestFailed: any;

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

    ngAfterContentInit(): void{
        this.obsTriggerLoadAnimation = action
            .filter(a => a.name === ACTIONS.TRIGGER_LOAD_ANIMATION)
            .subscribe(() => {
                const load = () => {
                    this.loadFailed = false;
                    this.showLoading = true;
                };
                if (this.loadFailed) {
                    this.showLoading = false;
                    load();
                } else {
                    load();
                }
            });
        this.obsTriggerLoadAnimationDone = action
            .filter(a => a.name === ACTIONS.TRIGGER_LOAD_ANIMATION_DONE)
            .subscribe(() => {
                this.loadFailed = false;
                this.doneLoading = true;
                setTimeout(() => {
                    this.showLoading = false;
                    this.doneLoading = false;
                    this.loadFailed = false;
                }, 600);
            });
        this.obsRequestFailed = action
            .filter(a => a.name === ACTIONS.REQUEST_FAILED)
            .subscribe(() => {
                this.loadFailed = true;
            });

        if (this.isUserPage(this.props.route)) {
            this.mountHeaderChange();
        }
    }

    ngOnDestroy(): void {

    }

    mountHeaderChange() {
        // this.unmountHeaderChange(); // Make sure there is no multiple mount
        // this.refs.header.classList.add('transparent');
        // this.scrollSection = document.getElementById('scroll-section');
        // this.wait = false;
        // this.obsChangeHeaderColor = Rx.Observable
        //     .fromEvent(this.scrollSection, 'scroll')
        //     .subscribe(() => {
        //         this.lastScrollTop = this.scrollSection.scrollTop;
        //         if (this.wait === false) {
        //             window.requestAnimationFrame(() => {
        //                 // Access direct to the DOM for better scrolling performance
        //                 if (this.lastScrollTop === 0) {
        //                     this.refs.header.classList.add('transparent');
        //                 } else {
        //                     this.refs.header.classList.remove('transparent');
        //                 }
        //                 this.wait = false;
        //             });
        //             this.wait = true;
        //         }
        //     });
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
