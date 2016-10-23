import {
    Component,
    OnInit,
    AfterViewInit,
    OnChanges,
    SimpleChanges,
    OnDestroy,
    ElementRef,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';
import { ActionService, action } from '../../action/action.service'
import { Router } from '@angular/router';
import { ACTIONS } from '../../action/action.types'

import { Observable, Subscription, Subject } from 'rxjs'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/distinctUntilChanged'


@Component({
    selector: 'nav-menu',
    templateUrl: './nav-menu.component.html',
    // styleUrls: ['./nav-menu.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('in', style({opacity: 1,transform: 'translateY(0)'})),
            transition('void => *', [
                style({opacity: 1,transform: 'translateY(50px)'}),
                animate('200ms 200ms')
            ]),
            transition('* => void', [
                animate('200ms 200ms', style({opacity: 0,transform: 'translateY(-50px)'}))
            ])
        ])
    ]

})
export class NavMenuComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy{
    searchText: string;
    isSearching: boolean;
    users: Array<any>;

    wait: boolean;

    obsCancelSearch: Subscription;
    obsReceiveUsers: Subscription;
    obsTriggerTextChange: Subscription;
    obsSearchTextChange: Subject<any>;

    elUserList: any;
    elSearchBar : any;

    constructor(
        private actionService: ActionService,
        private router: Router,
        private elementRef: ElementRef
    ){
        this.users = [];
        this.searchText = '';
        this.isSearching = true;
        
        this.wait = false;
        
        this.obsSearchTextChange = new Subject<any>();
    }

    ngOnInit(): void{


    }

    ngOnChanges(changes: SimpleChanges) {

        console.log('userpage=ngOnChanges===>');
        console.dir(changes);

    }

    ngAfterViewInit(): void{

        this.obsCancelSearch = action
            .filter(a => a.name === ACTIONS.OPEN_NAV_MENU)
            .subscribe(() => {
                this.searchText = '';
            });
        this.obsReceiveUsers = action
            .filter(a => a.name === ACTIONS.USERS_RECEIVED)
            .map(a => a.data)
            .subscribe(users => {
                this.users = users;
                this.isSearching = false;
            });
        this.obsTriggerTextChange = this.obsSearchTextChange
            .debounceTime(1000)
            .distinctUntilChanged()
            .flatMap(text => {
                this.isSearching = true;
                return Observable.fromPromise(this.actionService.getUsers(text)).takeUntil(this.obsSearchTextChange);

            })
            .subscribe(() => this.isSearching = false);

        // let el : HTMLElement = this.elementRef.nativeElement;
        // this.elUserList = el.querySelector('#user-list');
        // this.elSearchBar = el.querySelector('#search-bar');

        
        this.searchUsers();
    }

    searchTextChange(text: string){
        console.dir(text);
        this.searchText = text;

        this.obsSearchTextChange.next(text);
    }

    searchUsers() : void {

        this.isSearching = true;
        this.actionService.getUsers(this.searchText);

    }

    fullNavMenu() : void {
        action.next({ name: ACTIONS.FULL_NAV_MENU });
    }

    openNavMenu() : void {
        action.next({ name: ACTIONS.OPEN_NAV_MENU });
    }

    highlightSearchbar(e, elSearchBar) : void{

        // console.log(' highlightSearchbar -----> ');
        // console.dir(e);
        // console.dir(searchbar);
        // console.dir(this);

        //this is another way to get element
        // let lastScrollTop = this.elUserList.scrollTop;
        let lastScrollTop = e.target.scrollTop;
        if (!this.wait) {
            window.requestAnimationFrame(() => {
                if (lastScrollTop > 0) {
                    elSearchBar.classList.add('dark-bg');
                } else {
                    elSearchBar.classList.remove('dark-bg');
                }
                this.wait = false;
            });
            this.wait = true;
        }

    }

    userClick(login) {



        action.next({ name: ACTIONS.CLOSE_NAV_MENU });
        // Wait for animation done, we don't want to overheat the CPU
        setTimeout(() => {
            let path = ['/user',login];
            this.router.navigate(path);
        }, 300);
    }
    
    ngOnDestroy() : void {
        this.obsCancelSearch.unsubscribe();
        this.obsReceiveUsers.unsubscribe();
        this.obsTriggerTextChange.unsubscribe();
    }
}
