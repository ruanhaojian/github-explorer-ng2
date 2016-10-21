import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { ROUTES, matchParams } from '../../utils/routes';


@Component({
    selector: 'main-content',
    templateUrl: './main-content.component.html',
    // styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, OnDestroy, AfterViewInit{

    isShowFooter : boolean;
    
    constructor(
        private route: ActivatedRoute,
        private router : Router
    ) {
        this.isShowFooter = true;
    }

    ngOnInit(): void{

    }

    ngAfterViewInit(): void{


        // subscribe the router change
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((val) => {
                // see also
                console.log('router.events subscribe');
                console.dir(this.route);
                // console.dir(val);
                if (!this.isUserPage(this.route.firstChild.routeConfig.path)) {
                    this.isShowFooter = false;
                } else {
                    this.isShowFooter = true;
                }
            });

    }

    isUserPage(route): boolean {
        return route === undefined || // React Router returns undefined on root?
            route == '' ||
            route === ROUTES.USER_DETAIL ||
            route === ROUTES.HOME;
    }

    ngOnDestroy(): void{

    }

}
