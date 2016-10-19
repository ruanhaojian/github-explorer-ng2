import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Location }          from '@angular/common';
import { ROUTES, matchParams } from '../../utils/routes';
import { Observable } from 'rxjs'
import 'rxjs/add/observable/fromEvent'

import { action } from '../../action/action.service'
import { ACTIONS } from '../../action/action.types'

@Component({
    selector: 'header-bar',
    templateUrl: './header-bar.component.html',
    // styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit{
    showLoading: boolean;
    doneLoading: boolean;
    loadFailed: boolean;

    header : any;
    scrollSection: any;
    wait: boolean;
    lastScrollTop: number;

    obsTriggerLoadAnimation: any;
    obsTriggerLoadAnimationDone: any;
    obsRequestFailed: any;
    obsChangeHeaderColor: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private elementRef: ElementRef
    ) {
        this.showLoading = false;
        this.doneLoading = false;
        this.loadFailed = false;
    }

    ngOnChanges(changes: SimpleChanges){

        console.log('header-bar=ngOnChanges===>');
        console.dir(changes);
        
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void{

        let el : HTMLElement = this.elementRef.nativeElement;
        this.header = el.querySelector('.header');

        // subscribe the router change
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((val) => {
                // see also
                console.log('router.events subscribe');
                console.dir(this.route);
                // console.dir(val);
                
                if (!this.isUserPage(this.route.firstChild.routeConfig.path)) {
                    this.unmountHeaderChange();
                } else {
                    this.mountHeaderChange();
                }
            });

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
        
    }

    ngOnDestroy(): void {
        this.obsTriggerLoadAnimation.dispose();
        this.obsTriggerLoadAnimationDone.dispose();
        this.obsRequestFailed.dispose();
        this.unmountHeaderChange();
    }

    unmountHeaderChange() {
        this.header.classList.remove('transparent');
        this.obsChangeHeaderColor && this.obsChangeHeaderColor.dispose();
        this.obsChangeHeaderColor = null;
    }

    mountHeaderChange() {
        this.unmountHeaderChange(); // Make sure there is no multiple mount
        this.header.classList.add('transparent');
        this.scrollSection = document.getElementById('scroll-section');
        this.wait = false;
        this.obsChangeHeaderColor = Observable
            .fromEvent(this.scrollSection, 'scroll')
            .subscribe(() => {
                this.lastScrollTop = this.scrollSection.scrollTop;
                if (this.wait === false) {
                    window.requestAnimationFrame(() => {
                        // Access direct to the DOM for better scrolling performance
                        if (this.lastScrollTop === 0) {
                            this.header.classList.add('transparent');
                        } else {
                            this.header.classList.remove('transparent');
                        }
                        this.wait = false;
                    });
                    this.wait = true;
                }
            });
    }

    isUserPage(route): boolean {
        return route === undefined || // React Router returns undefined on root?
            route == '' ||
            route === ROUTES.USER_DETAIL ||
            route === ROUTES.HOME;
    }

    shouldShowBackBtn(route): any{

        // let caseRoute = {
        //     HOME: matchParams(ROUTES.HOME, this.route.snapshot.params)
        // }

        switch (route) {
            case '': return false;
            case ROUTES.HOME: return false;
            case ROUTES.USER_DETAIL: return false;
            case ROUTES.USER_REPO_LIST: return ROUTES.USER_DETAIL;
            case ROUTES.REPO_DETAIL: return ROUTES.USER_REPO_LIST;
            default: return false;
        }
    }
}
