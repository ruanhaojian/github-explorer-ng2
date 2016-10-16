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

    getUsers(keyword: string) {

        return this.http.get(`${this.baseUrl}/legacy/user/search/` +
                `${keyword || Math.random().toString(36).split('')[2]}%20sort:followers`, {headers: this.headers})
            .toPromise()
            .then((res : Response) => res.json())
            .then(data => data.users.slice(0, 15))
            .then(users => {
                console.dir(users)
            })
            .catch(this.handleError);
    }





    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
