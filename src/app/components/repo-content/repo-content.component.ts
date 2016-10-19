import { Component } from '@angular/core';

@Component({
    selector: 'repo-content',
    templateUrl: './repo-content.component.html',
    // styleUrls: ['./repo-content.component.scss'],
    inputs: ['repo']
})
export class RepoContentComponent {
    repo: any;


}
