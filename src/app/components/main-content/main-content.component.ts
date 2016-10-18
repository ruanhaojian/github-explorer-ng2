import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';


@Component({
    selector: 'main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, OnDestroy, AfterViewInit{

    constructor(
        private route: ActivatedRoute
    ) {

    }

    ngOnInit(): void{

    }

    ngAfterViewInit(): void{

        console.log('main-content ==== > view init');
        

    }

    ngOnDestroy(): void{

    }

}
