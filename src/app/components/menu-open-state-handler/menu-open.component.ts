import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { action } from '../../action/action.service'
import { ACTIONS } from '../../action/action.types'
import { Subscription } from 'rxjs'

@Component({
    selector: 'menu-open-state-handler',
    templateUrl: './menu-open.component.html',
    // styleUrls: ['./menu-open.component.scss'],
})
export class MenuOpenComponent implements AfterViewInit, OnDestroy{
    open: boolean;
    obsToggleNavMenu: Subscription;
    obsOpenNavMenu: Subscription;
    obsCloseNavMenu: Subscription;

    constructor(){
        this.open = false;
    }

    ngAfterViewInit(): void{

        this.obsToggleNavMenu = action
            .filter(a => a.name === ACTIONS.TOGGLE_NAV_MENU)
            .subscribe(() => {
                this.open = !this.open;
            });
        this.obsOpenNavMenu = action
            .filter(a => a.name === ACTIONS.OPEN_NAV_MENU)
            .subscribe(() => {
                this.open = true;
            });
        this.obsCloseNavMenu = action
            .filter(a => a.name === ACTIONS.CLOSE_NAV_MENU)
            .subscribe(() => {
                this.open = false;
            });

    }


    ngOnDestroy() : void {

        this.obsToggleNavMenu && this.obsToggleNavMenu.unsubscribe();
        this.obsOpenNavMenu && this.obsOpenNavMenu.unsubscribe();
        this.obsCloseNavMenu && this.obsCloseNavMenu.unsubscribe();

    }
}
