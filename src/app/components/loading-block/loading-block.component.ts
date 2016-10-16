import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import Timer = NodeJS.Timer;

class LoadingState {
    one : boolean;
    two : boolean;
    three : boolean;
    failed : boolean;
}

@Component({
    selector: 'loading-block',
    templateUrl: './loading-block.component.html',
    styleUrls: ['./loading-block.component.scss'],
    inputs: ['done', 'failed'],
})
export class LoadingBlockComponent implements OnInit, OnDestroy, OnChanges{
    loadingState: LoadingState;
    timer: Timer;

    constructor() {
        this.loadingState = {
            one: false,
            two: false,
            three: false,
            failed: false
        };
        
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes['done'].currentValue) {
            this.loadingState.three = true
        }
        if (changes['failed'].currentValue) {
            this.loadingState.failed = true
        }
    }


    ngOnInit(): void {
        this.timer = setTimeout(() => this.loadingState.one = true, 17);
        this.timer = setTimeout(() => this.loadingState.two = true, 500);
    }

    ngOnDestroy(): void {
        this.timer && clearTimeout(this.timer);
    }

}
