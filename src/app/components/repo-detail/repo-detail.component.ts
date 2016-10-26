import { Component, AfterViewInit,ElementRef, OnDestroy } from '@angular/core';
import { ActionService, action } from '../../action/action.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ACTIONS } from '../../action/action.types';
import { Base64 } from 'js-base64'
import { Observable, Subscription } from 'rxjs'
import 'rxjs/add/observable/fromEvent'

import languageColor from '../../utils/language-colors';

var marked = require('marked')


@Component({
    selector: 'repo-detail',
    templateUrl: './repo-detail.component.html',
    // styleUrls: ['./repo-detail.component.scss'],
})
export class RepoDetailComponent implements AfterViewInit, OnDestroy{
    activeTab: string;
    transStyle: boolean;
    offsetTop: number;
    loadFailed: boolean;

    markedHtml: string;

    startPosition: any;
    TABS: Array<any>;
    scrollDom: any;
    wait: boolean;

    repoData: any;
    repo: Array<any>;
    readme: string;
    contribs: Array<any>;
    contents: any;
    languages: Array<any>;

    obsRepoDetailReceived: Observable<any>;
    obsRepoReadmeReceived: Observable<any>;
    obsRepoContribsReceived: Observable<any>;
    obsRepoContentsReceived: Observable<any>;
    obsRepoLanguagesReceived: Observable<any>;
    obsRequestFailed: Subscription;
    obsLoadDone: Subscription;
    obsTabWrapper: Subscription;

    tabContent: any;
    tabWrapper: any;
    lastOffsetTop: number;

    constructor(
        private actionService: ActionService,
        private route: ActivatedRoute,
        private elementRef: ElementRef
    ){
        this.repo = [];
        this.contents = [];
        this.contribs = [];
        this.languages = [];
        this.readme = '';

        this.markedHtml = '';

        this.activeTab = '';
        this.transStyle = false;
        this.offsetTop = 0;
        this.startPosition = {
            top: 0,
            left: 0,
            right: 0,
        };
        this.TABS = [
            { key: 'readme', value: 'README' },
            { key: 'files', value: 'FILES & DIRECTORIES' },
            { key: 'contributors', value: 'CONTRIBUTORS' },
            { key: 'languages', value: 'LANGUAGES' },
        ];

        this.lastOffsetTop = 0;
    }

    ngAfterViewInit() : void {
        this.tabWrapper = document.getElementById('repo-tabs-wrapper');
        this.tabContent = document.getElementById('repo-tab-content');

        this.scrollDom = document.getElementById('scroll-section');

        this.obsRepoDetailReceived = action
            .filter(a => a.name === ACTIONS.REPO_DETAIL_RECEIVED)
            .map(a => a.data);

        this.obsRepoReadmeReceived = action
            .filter(a => a.name === ACTIONS.REPO_README_RECEIVED)
            .map(a => a.data.content || '')
            .map(readme => Base64.decode(readme.replace(/\s/g, '')));

        this.obsRepoContribsReceived = action
            .filter(a => a.name === ACTIONS.REPO_CONTRIS_RECEIVED)
            .map(a => a.data);

        this.obsRepoContentsReceived = action
            .filter(a => a.name === ACTIONS.REPO_CONTENTS_RECEIVED)
            .map(a => a.data)
            .map(contents => {
                contents.sort((a, b) => a.type.localeCompare(b.type));
                return contents;
            });

        this.obsRepoLanguagesReceived = action
            .filter(a => a.name === ACTIONS.REPO_LANGUAGES_RECEIVED)
            .map(a => a.data)
            .map(languages => {
                const newLanguages = Object.keys(languages)
                    .map(key => ({ name: key, value: languages[key] }));

                let total = 0;
                if (newLanguages.length === 0) {
                    total = 0;
                } else if (newLanguages.length === 1) {
                    total = newLanguages[0].value;
                } else {
                    // total = newLanguages.reduce((a, b) => ({ value: a.value + b.value })).value;


                    total = newLanguages.reduce(function (previous, current) {
                        return {
                            name: current.name,
                            value: previous.value + current.value
                        };
                    }).value;

                }

                return newLanguages.map(a => ({
                    name: a.name,
                    value: Math.round(1000 * a.value / total) / 10,
                }));
            });

        // Track request failed
        this.obsRequestFailed = action
            .filter(a => a.name === ACTIONS.REQUEST_FAILED)
            .subscribe(() => {
                this.loadFailed = true;
            });

        this.obsLoadDone = Observable.zip(
            this.obsRepoDetailReceived,
            this.obsRepoReadmeReceived,
            this.obsRepoContribsReceived,
            this.obsRepoContentsReceived,
            this.obsRepoLanguagesReceived
        ).subscribe(([repo, readme, contribs, contents, languages]) => {
            action.next({ name: ACTIONS.TRIGGER_LOAD_ANIMATION_DONE });

            this.loadFailed = false;
            this.activeTab = 'readme';
            this.repo = repo;
            this.readme = readme;
            this.contribs = contribs;
            this.contents = contents;
            this.languages = languages;
            
            this.markedHtml = marked(readme);

            setTimeout(()=>{
                this.refreshContentHeight(this.TABS[0]);

            });

        });


        // Track the tab wrapper
        this.obsTabWrapper = Observable
            .fromEvent(this.scrollDom, 'scroll')
            .subscribe(() => {
                this.lastOffsetTop = this.tabWrapper.parentElement.getBoundingClientRect().top;
                if (this.wait === false) {
                    window.requestAnimationFrame(() => {
                        if (this.lastOffsetTop < 60) {
                            this.tabWrapper.classList.add('fixed');
                        } else {
                            this.tabWrapper.classList.remove('fixed');
                        }
                        this.wait = false;
                    });
                    this.wait = true;
                }
            });

        this.getProfile();

    }

    getProfile(){
        
        let username = this.route.snapshot.params['username'];
        let repoName = this.route.snapshot.params['repoName'];


        this.actionService.getRepoDetail(username, repoName);
        this.actionService.getRepoReadme(username, repoName);
        this.actionService.getRepoContents(username, repoName);
        this.actionService.getRepoContribs(username, repoName);
        this.actionService.getRepoLanguages(username, repoName);

        action.next({ name: ACTIONS.TRIGGER_LOAD_ANIMATION });

    }

    switchTab(tab) {
        
        this.activeTab = tab.key;
        this.refreshContentHeight(tab);
        
    }
    
    refreshContentHeight(tab){
        const selectedTab = document.getElementById(tab.key);
        this.tabContent.style.height = `${selectedTab.offsetHeight + 30}px`;
    }

    getColor(language) {
        return languageColor(language);
    }
    
    
    ngOnDestroy() : void{
        this.obsLoadDone.unsubscribe();
        this.obsTabWrapper.unsubscribe();
    }

}
