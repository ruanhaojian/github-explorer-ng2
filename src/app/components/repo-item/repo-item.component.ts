import { Component } from '@angular/core';

@Component({
    selector: 'repo-item',
    templateUrl: './repo-item.component.html',
    // styleUrls: ['./repo-item.component.scss'],
    inputs: ['repo']
})
export class RepoItemComponent {
    repo: any;
    

}
