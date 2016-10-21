import {
    Component,
    Input,
    OnInit,
    OnChanges,
    AfterViewInit,
    OnDestroy ,
    SimpleChanges,
    ElementRef,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';
import { ActionService, action } from '../../action/action.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ACTIONS } from '../../action/action.types';
import { Observable, Subscription } from 'rxjs'
import 'rxjs/add/observable/fromEvent'

@Component({
    selector: 'repo-list',
    templateUrl: './repo-list.component.html',
    // styleUrls: ['./repo-list.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('in', style({opacity: 1,transform: 'translateY(0)'})),
            transition('void => *', [
                style({opacity: 1,transform: 'translateY(50px)'}),
                animate('200ms 100ms')
            ]),
            transition('* => void', [
                animate('200ms 100ms', style({opacity: 0,transform: 'translateY(-50px)'}))
            ])
        ])
    ]
})
export class RepoListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy{
    searchText: string;
    isShowSearch: boolean;
    isSearching: boolean;
    repos: Array<any>;
    complete: boolean;
    offsetTop: number;
    wait: boolean;
    page: number;
    emptyData: boolean;

    lastScrollTop: any;
    searchWrapper: any;
    scrollWrapper: any;

    obsUserReposComplete: Subscription;
    obsReceiveUserRepos: Subscription;
    obsReceiveUserReposNextPage: Subscription;
    obsHighlightSearchbox: Subscription;
    
    constructor(
        private actionService: ActionService,
        private route: ActivatedRoute,
        private elementRef: ElementRef
    ){
        this.searchText = '';
        this.isSearching = false;
        this.isShowSearch = false;
        this.repos = [];
        this.complete = false;
        this.offsetTop = 0;
        this.wait = false;
        this.page = 1;
        this.emptyData = false;
    }

    ngOnInit(): void{


    }

    ngOnChanges(changes: SimpleChanges) {

        console.log('repo-list=ngOnChanges===>');
        console.dir(changes);

    }

    ngAfterViewInit(): void{


        this.obsUserReposComplete = action
            .filter(a => a.name === ACTIONS.USER_REPOS_COMPLETE)
            .subscribe(() => this.complete = true);

        this.obsReceiveUserRepos = action
            .filter(a => a.name === ACTIONS.USER_REPOS_RECEIVED)
            .map(a => a.data)
            .subscribe(repos => {

                this.repos = repos;
                this.isSearching = false;
                this.emptyData = repos.length === 0 && this.page === 1;

                action.next({ name: ACTIONS.TRIGGER_LOAD_ANIMATION_DONE });
            });

        this.obsReceiveUserReposNextPage = action
            .filter(a => a.name === ACTIONS.USER_REPOS_NEXT_PAGE_RECEIVED)
            .map(a => a.data)
            .subscribe(paging => {

                this.page = paging.page;
                this.repos = this.repos.concat(paging.repos);
                this.isSearching = false;

                action.next({ name: ACTIONS.TRIGGER_LOAD_ANIMATION_DONE });
            });


        let el : HTMLElement = this.elementRef.nativeElement;
        this.searchWrapper = el.querySelector('#search-wrapper');
        this.scrollWrapper = el.querySelector('#scroll-wrapper');

        // Track the search box
        // this.obsHighlightSearchbox = Observable
        //     .fromEvent(this.scrollWrapper, 'scroll')
        //     .subscribe(() => {
        //         this.lastScrollTop = this.scrollWrapper.scrollTop;
        //         if (this.wait === false) {
        //             window.requestAnimationFrame(() => {
        //                 if (this.lastScrollTop > 0) {
        //                     this.searchWrapper.classList.add('shadow');
        //                 } else {
        //                     this.searchWrapper.classList.remove('shadow');
        //                 }
        //                 this.wait = false;
        //             });
        //             this.wait = true;
        //         }
        //     });


        this.searchInit();

    }

    searchTextChange(text: string){
        console.dir(text);
        this.searchText = text;
    }

    searchInit() {

        setTimeout(() => this.isShowSearch = true, 300);

        action.next({ name: ACTIONS.TRIGGER_LOAD_ANIMATION });

        setTimeout(() => {
            // Get user profile
            let username = this.route.snapshot.params['username'];
            this.actionService.searchUserRepos(
                username, this.searchText, this.page);
        }, 300);
        
        this.hackTheFooter();
    }

    scroll() {

        this.lastScrollTop = this.scrollWrapper.scrollTop;
        if (this.wait === false) {
            window.requestAnimationFrame(() => {
                if (this.lastScrollTop > 0) {
                    this.searchWrapper.classList.add('shadow');
                } else {
                    this.searchWrapper.classList.remove('shadow');
                }
                this.wait = false;
            });
            this.wait = true;
        }

    }

    loadMore() {

        if (this.isSearching) return;

        this.isSearching = true;

        let username = this.route.snapshot.params['username'];

        action.next({ name: ACTIONS.TRIGGER_LOAD_ANIMATION });
        this.actionService.searchUserRepos(
            username, this.searchText, this.page + 1);

    }

    search() {

        if (this.isSearching) return;

        this.page = 1;
        this.complete = false;
        this.isSearching = true;
        this.repos = [];

        let username = this.route.snapshot.params['username'];

        // this.refs.scrollWrapper.scrollTop = 0;
        action.next({ name: ACTIONS.TRIGGER_LOAD_ANIMATION });
        this.actionService.searchUserRepos(username, this.searchText, this.page);

    }

    ngOnDestroy() : void{

        this.obsReceiveUserRepos && this.obsReceiveUserRepos.unsubscribe();
        this.obsReceiveUserReposNextPage && this.obsReceiveUserReposNextPage.unsubscribe();
        this.obsUserReposComplete && this.obsUserReposComplete.unsubscribe();
        this.obsHighlightSearchbox && this.obsHighlightSearchbox.unsubscribe();

        // Undo the footer hack in RepoList
        // document.querySelector('.footer.original').style.display = 'flex';

    }

    hackTheFooter() {
        // const oldFooter = document.querySelector('.footer');
        // const newFooter = oldFooter.cloneNode(true);
        // oldFooter.style.display = 'none';
        // newFooter.classList.remove('original');
        // document.querySelector('#repo-list-page #scroll-wrapper').appendChild(newFooter);
    }
}
