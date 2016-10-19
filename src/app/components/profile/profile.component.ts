import { Component } from '@angular/core';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    // styleUrls: ['./profile.component.scss'],
    inputs: ['profile']
})
export class ProfileComponent {
    profile: any;

    constructor(){
        this.profile = {};
        
    }
}
