import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActionService, action } from '../../action/action.service'
import { ACTIONS } from '../../action/action.types'

@Component({
    selector: 'user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, AfterContentInit, OnChanges{
    profile: any;
    obsReceivedUserProfile: any;

    constructor(private actionService: ActionService){

    }

    ngOnInit(): void{
        this.loadUser(null);
    }

    ngOnChanges(changes: SimpleChanges) {


    }

    ngAfterContentInit(): void{

        const userProfile = action.filter(a => a.name === ACTIONS.USER_PROFILE_RECEIVED);

        this.obsReceivedUserProfile = userProfile.map(a => a.data)
            .subscribe(profile => this.profile = profile);

    }

    loadUser(username: string) {
        if (username) {
            // actionFactory.getUserProfile(username);
            // actionFactory.getUserProfileRepos(username);
        } else {

            this.actionService.getRandomUser()
                .then(user => {
                    this.actionService.getUserProfile(user.login);
                    
                    // actionFactory.getUserProfile(user.login);
                    // actionFactory.getUserProfileRepos(user.login);
                });


        }

        action.next({ name: ACTIONS.TRIGGER_LOAD_ANIMATION });
    }
}
