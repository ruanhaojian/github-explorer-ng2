import {
    Component,
    Input,
    OnInit,
    OnChanges,
    AfterViewInit,
    OnDestroy ,
    SimpleChanges,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';
import { ActionService, action } from '../../action/action.service'
import { ActivatedRoute, Params } from '@angular/router';
import { ACTIONS } from '../../action/action.types'

@Component({
    selector: 'repo-list',
    templateUrl: './repo-list.component.html',
    // styleUrls: ['./repo-list.component.scss'],
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
export class RepoListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy{
    isSearching: boolean;
    repos: any;
    complete: boolean;

    constructor(
        private actionService: ActionService,
        private route: ActivatedRoute
    ){
        this.isSearching = false;
        this.repos = [];
        this.complete = false;
    }

    ngOnInit(): void{


    }

    ngOnChanges(changes: SimpleChanges) {

        console.log('repo-list=ngOnChanges===>');
        console.dir(changes);

    }

    ngAfterViewInit(): void{



    }

    scroll() {


    }

    loadMore() {


    }

    ngOnDestroy() : void{

    }

}
