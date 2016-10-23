import {
    Component,
    OnInit,
    AfterViewInit,
    OnChanges,
    SimpleChanges,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';
import { ActionService, action } from '../../action/action.service'
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { ACTIONS } from '../../action/action.types'

import { Observable, Subscription } from 'rxjs'

@Component({
    selector: 'user-page',
    templateUrl: './user-page.component.html',
    // styleUrls: ['./user-page.component.scss'],
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
export class UserPageComponent implements OnInit, AfterViewInit, OnChanges{
    profile: any;
    repos: Array<any>;

    obsReceivedUserProfile: Subscription;
    obsReceiveUserRepos: Subscription;
    obsLoadDone: Subscription;

    constructor(
        private actionService: ActionService,
        private route: ActivatedRoute,
        private router: Router
    ){
        this.profile = {};
    }

    ngOnInit(): void{


        // subscribe the router change
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((val) => {
                
                if(this.route){
                    let username = this.route.snapshot.params['username'];
                    if(username != this.profile.login){
                        this.loadUser(username);
                    }
                }

            });

    }

    ngOnChanges(changes: SimpleChanges) {

        console.log('userpage=ngOnChanges===>');
        console.dir(changes);

    }

    ngAfterViewInit(): void{

        const userProfile = action.filter(a => a.name === ACTIONS.USER_PROFILE_RECEIVED);
        const userRepos = action.filter(a => a.name === ACTIONS.USER_PROFILE_REPOS_RECEIVED);

        this.obsReceivedUserProfile = userProfile.map(a => a.data)
            .subscribe(profile => this.profile = profile);
        this.obsReceiveUserRepos = userRepos.map(a => a.data)
            .subscribe(repos => this.repos = repos);
        this.obsLoadDone = Observable.zip(userProfile, userRepos)
            .subscribe(() => action.next({ name: ACTIONS.TRIGGER_LOAD_ANIMATION_DONE }));


        console.dir(this.route);
        
        let username = this.route.snapshot.params['username'];
        this.loadUser(username);

    }

    loadUser(username: string) {

        if (username) {
            this.actionService.getUserProfile(username);
            this.actionService.getUserProfileRepos(username);
        } else {
            this.actionService.getRandomUser()
                .then(user => {
                    this.actionService.getUserProfile(user.login);
                    this.actionService.getUserProfileRepos(user.login);
                });
        }


        action.next({ name: ACTIONS.TRIGGER_LOAD_ANIMATION });
    }
}
