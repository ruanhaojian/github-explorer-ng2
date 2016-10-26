import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Subject } from 'rxjs'
import { ACTIONS } from './action.types'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

export const action = new Subject<any>();

@Injectable()
export class ActionService {
    TOKEN = '48d499e1bbc2e206d1e4f720f101af12a5918806';
    REPO_PER_PAGE = 10;

    private headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `token ${this.TOKEN}`,
    });
    private baseUrl = 'https://api.github.com';  // URL to web api

    constructor(
        private http: Http
    ) {


        // http.get('people.json')
        //     // Call map on the response observable to get the parsed people object
        //     .map(res => res.json())
        //     // Subscribe to the observable to get the parsed people object and attach it to the
        //     // component
        //     .subscribe(people => this.people = people);

        // this.action = new Subject();

    }

    // getHeroes(): Promise<Hero[]> {
    //     return this.http.get(this.heroesUrl)
    //         .toPromise()
    //         .then(response => response.json().data as Hero[])
    //         .catch(this.handleError);
    // }

    getRandomUser() {

        return this.http.get(`${this.baseUrl}/search/users?q=type:user&page=1&per_page=1`, {headers: this.headers})
            .toPromise()
            .then((res : Response) => res.json())
            .then(data => data.items[0])
            .catch(this.handleError);
    }

    getUserProfile(username: string) {

        return this.http.get(`${this.baseUrl}/users/${username}`, {headers: this.headers})
            .toPromise()
            .then((res : Response) => res.json())
            .then(profile => {
                action.next({
                    name: ACTIONS.USER_PROFILE_RECEIVED,
                    data: profile,
                })
            })
            .catch(this.handleError);

    }

    getUserProfileRepos(username: string) {
        return this.http.get(`${this.baseUrl}/search/repositories` +
                `?q=user:${username}&sort=stars&page=1&per_page=${this.REPO_PER_PAGE}`, {headers: this.headers})
            .toPromise()
            .then((res : Response) => res.json())
            .then(data => {
                action.next({
                    name: ACTIONS.USER_PROFILE_REPOS_RECEIVED,
                    data: data.items,
                });
            })
            .catch(this.handleError);
    }

    searchUserRepos(user: string, keyword: string, page: number) {
        return this.http.get('https://api.github.com/search/repositories' +
                `?q=${keyword}%20user:${user}&sort=updated&page=${page}&per_page=${this.REPO_PER_PAGE}`, {headers: this.headers})
            .toPromise()
            .then((res : Response) => res.json())
            .then(data => {
                if (+page > 1) {
                    action.next({
                        name: ACTIONS.USER_REPOS_NEXT_PAGE_RECEIVED,
                        data: { page, repos: data.items },
                    });
                } else {
                    action.next({
                        name: ACTIONS.USER_REPOS_RECEIVED,
                        data: data.items,
                    });
                }
                if (data.items.length < this.REPO_PER_PAGE) {
                    action.next({
                        name: ACTIONS.USER_REPOS_COMPLETE,
                    });
                }
                
            })
            .catch(this.handleError);
    }

    getUsers(keyword: string) {

        return this.http.get(`${this.baseUrl}/legacy/user/search/` +
                `${keyword || Math.random().toString(36).split('')[2]}%20sort:followers`, {headers: this.headers})
            .toPromise()
            .then((res : Response) => res.json())
            .then(data => data.users.slice(0, 15))
            .then(users => {
                action.next({
                    name: ACTIONS.USERS_RECEIVED,
                    data: users,
                });
            })
            .catch(this.handleError);
    }

    getRepoDetail(username, repoName){
        return this.http.get(`${this.baseUrl}/repos/${username}/${repoName}`, {headers: this.headers})
            .toPromise()
            .then((res : Response) => res.json())
            .then(repo => {
                action.next({
                    name: ACTIONS.REPO_DETAIL_RECEIVED,
                    data: repo,
                });
            })
            .catch(this.handleError);
    }

    getRepoReadme(username, repoName){
        return this.http.get(`${this.baseUrl}/repos/${username}/${repoName}/readme`, {headers: this.headers})
            .toPromise()
            .then((res : Response) => res.json())
            .then(readme => {
                action.next({
                    name: ACTIONS.REPO_README_RECEIVED,
                    data: readme,
                });
            })
            .catch(this.handleError);
    }

    getRepoContents(username, repoName){
        return this.http.get(`${this.baseUrl}/repos/${username}/${repoName}/contents`, {headers: this.headers})
            .toPromise()
            .then((res : Response) => res.json())
            .then(contents => {
                action.next({
                    name: ACTIONS.REPO_CONTENTS_RECEIVED,
                    data: contents,
                });
            })
            .catch(this.handleError);
    }

    getRepoContribs(username, repoName){
        return this.http.get(`${this.baseUrl}/repos/${username}/${repoName}/contributors`, {headers: this.headers})
            .toPromise()
            .then((res : Response) => res.json())
            .then(contris => {
                action.next({
                    name: ACTIONS.REPO_CONTRIS_RECEIVED,
                    data: contris,
                });
            })
            .catch(this.handleError);
    }

    getRepoLanguages(username, repoName){
        return this.http.get(`${this.baseUrl}/repos/${username}/${repoName}/languages`, {headers: this.headers})
            .toPromise()
            .then((res : Response) => res.json())
            .then(languages => {
                action.next({
                    name: ACTIONS.REPO_LANGUAGES_RECEIVED,
                    data: languages,
                });
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
